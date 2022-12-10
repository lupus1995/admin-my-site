import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminModal from "commons/AdminModal";
import Dashboard from "commons/Dashboard";
import FormRow from "commons/FormRow";
import Title from "commons/Title";
import useUtilsStyles from "utils/styles";

import { ArticleI } from "../interface";
import { getArticles, deletedArticle as deletedArticleRequest } from "./api";
import useStyles from "./style";

const ArticleList = () => {
  const [deletedArticle, setDeletedArticle] = useState<ArticleI | null>(null);
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const style = useStyles();

  const utilsStyles = useUtilsStyles();
  const handleClick = () => navigate("/admin/articles/create");

  const handleOpenModal = (article: ArticleI) => {
    setOpen(true);
    setDeletedArticle(article);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setDeletedArticle(null);
  };

  const deleteArticle = () => {
    deletedArticleRequest(deletedArticle._id).then((result) => {
      const successMessage = "Статья успешно удалена";
      toast(result.status ? successMessage : result.message, {
        type: result.status ? "success" : "error",
        hideProgressBar: true,
        theme: "colored",
      });

      if (result.redirectTo) {
        navigate(result.redirectTo);
      }

      if (result.status) {
        setArticles(articles.filter((item) => item._id !== deletedArticle._id));
      }

      handleCloseModal();
    });
  };

  useEffect(() => {
    getArticles().then((result) => {
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        navigate(result.redirectTo);
      }

      if (result.responseBody) {
        setArticles(result.responseBody);
      }
    });
  }, [navigate]);
  return (
    <Dashboard>
      <div className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn}`}>
        <FormRow>
          <Title title="Статьи на сайте" />
        </FormRow>
        <FormRow>
          <button
            onClick={handleClick}
            className={classNames(`${utilsStyles.button}`)}
            type="button"
          >
            Создать статью
          </button>
        </FormRow>

        {articles.length === 0 && <h2>Статей нет</h2>}

        {articles.length > 0 && (
          <div className={`${style.articlesContainer}`}>
            {articles.map((article) => (
              <article key={article._id} className={style.articleItem}>
                <div>
                  <img
                    className={style.articleTumbnail}
                    src={article.thumbnail}
                    alt={article.title}
                  />
                  <h3 className="articleTitle">{article.title}</h3>
                  <span className="articleDescription">
                    {article.description}
                  </span>
                </div>
                <div>
                  <Link
                    className={`${utilsStyles.button} ${utilsStyles.mr15}`}
                    to={`/admin/articles/edit/${article._id}`}
                  >
                    Редактировать
                  </Link>
                  <button
                    onClick={() => {
                      handleOpenModal(article);
                    }}
                    className={utilsStyles.button}
                    type="button"
                  >
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <AdminModal open={open}>
        <div className={`${style.modalHeaderContainer}`}>
          <h3>Удаление статьи</h3>
          <button
            className={classNames(`${utilsStyles.button}`)}
            type="button"
            onClick={handleCloseModal}
          >
            х
          </button>
        </div>

        <div className={`${style.modalContent}`}>
          <p>
            Вы действительно намерены удалить статью {deletedArticle?.title}?
          </p>
        </div>
        <div>
          <button
            onClick={deleteArticle}
            className={classNames(`${utilsStyles.button} ${utilsStyles.mr15}`)}
            type="button"
          >
            Удалить
          </button>
          <button
            onClick={handleCloseModal}
            className={classNames(`${utilsStyles.button}`)}
            type="button"
          >
            Отмена
          </button>
        </div>
      </AdminModal>
    </Dashboard>
  );
};

export default ArticleList;
