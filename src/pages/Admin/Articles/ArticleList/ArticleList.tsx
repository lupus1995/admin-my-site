import React, { useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormRow from "pages/Admin/commons/FormRow";
import MessageForEmptyList from "pages/Admin/commons/MessageForEmptyList";
import Title from "pages/Admin/commons/Title";
import AdminModal from "pages/Admin/components/AdminModal";
import Dashboard from "pages/Admin/components/Dashboard";
import { useSession } from "pages/Admin/hooks";
import Pagination from "pages/Page/components/Pagination/Pagination";
import useUtilsStyles from "utils/styles";

import { ArticleI } from "../../../interface";
import { getArticles, deletedArticle as deletedArticleRequest } from "./api";
import useStyles from "./style";

const ArticleList = () => {
  useSession();
  const { t, i18n } = useTranslation();
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

  const handleLoad = ({ offset, limit }: { offset: number; limit: number }) => {
    return getArticles({ offset, limit }).then((result) => {
      if (!result.status) {
        toast(t(result.message), {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        navigate(result.redirectTo);
        return [];
      }
      if (result.responseBody) {
        setArticles([...articles, ...result.responseBody]);
      }

      return result.responseBody || [];
    });
  };

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
                <FormRow>
                  <img
                    className={style.articleTumbnail}
                    src={article.thumbnail}
                    // @ts-ignore+
                    alt={article.title[i18n.language]}
                  />
                  <h3 className="articleTitle">
                    {/* @ts-ignore */}
                    {article.title[i18n.language]}
                  </h3>
                  <span className="articleDescription">
                    {/* @ts-ignore */}
                    {article.description[i18n.language]}
                  </span>
                </FormRow>
                <div style={{ marginTop: "auto" }}>
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

        <Pagination limit={10} handleLoad={handleLoad} />
      </div>

      <AdminModal
        open={open}
        handleClose={handleCloseModal}
        handleCallback={deleteArticle}
      >
        <p>
          {t("deleteArticleText", {
            /* @ts-ignore */
            title: deletedArticle?.title[i18n.language],
          })}
        </p>
      </AdminModal>
    </Dashboard>
  );
};

export default ArticleList;
