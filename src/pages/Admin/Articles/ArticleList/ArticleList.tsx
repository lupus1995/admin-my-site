import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminModal from "commons/AdminModal";
import Dashboard from "commons/Dashboard";
import FormRow from "commons/FormRow";
import MessageForEmptyList from "commons/MessageForEmptyList";
import Title from "commons/Title";
import useUtilsStyles from "utils/styles";

import { ArticleI } from "../interface";
import { getArticles, deletedArticle as deletedArticleRequest } from "./api";
import useStyles from "./style";

const ArticleList = () => {
  const { t } = useTranslation();
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
      const successMessage = "successDeleteArticle";
      toast(t(result.status ? successMessage : result.message), {
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
        toast(t(result.message), {
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
  }, [navigate, t]);

  return (
    <Dashboard>
      <div className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn}`}>
        <FormRow>
          <Title title={t("articlesOnSite")} />
        </FormRow>
        <FormRow>
          <button
            onClick={handleClick}
            className={classNames(`${utilsStyles.button}`)}
            type="button"
          >
            {t("createArticle")}
          </button>
        </FormRow>

        {articles.length === 0 && (
          <MessageForEmptyList message={t("emptyArticle")} />
        )}

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
                    {t("edit")}
                  </Link>
                  <button
                    onClick={() => {
                      handleOpenModal(article);
                    }}
                    className={utilsStyles.button}
                    type="button"
                  >
                    {t("delete")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <AdminModal open={open}>
        <div className={`${utilsStyles.modalHeaderContainer}`}>
          <h3>{t("deteleArticle")}</h3>
          <button
            className={classNames(`${utilsStyles.button}`)}
            type="button"
            onClick={handleCloseModal}
          >
            х
          </button>
        </div>

        <div className={`${utilsStyles.modalContent}`}>
          <p>{t("deleteArticleText", { title: deletedArticle?.title })}</p>
        </div>
        <div>
          <button
            onClick={deleteArticle}
            className={classNames(`${utilsStyles.button} ${utilsStyles.mr15}`)}
            type="button"
          >
            {t("delete")}
          </button>
          <button
            onClick={handleCloseModal}
            className={classNames(`${utilsStyles.button}`)}
            type="button"
          >
            {t("cancel")}
          </button>
        </div>
      </AdminModal>
    </Dashboard>
  );
};

export default ArticleList;
