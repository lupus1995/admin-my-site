import React, { useEffect, useState } from "react";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Pagination from "components/Pagination";
import { usePagination } from "components/Pagination/hooks";
import { FormRow, Title, MessageForEmptyList } from "pages/Admin/commons";
import { Dashboard, AdminModal } from "pages/Admin/components";
import { useSession } from "pages/Admin/hooks";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { getArticles, deletedArticle as deletedArticleRequest } from "./api";
import useStyles from "./style";
import { ArticleI } from "../../../interface";

const ArticleList = () => {
  useSession();
  const { t, languange } = useLanguage();
  const [deletedArticle, setDeletedArticle] = useState<ArticleI | null>(null);
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const style = useStyles();

  const utilsStyles = useUtilsStyles();
  const handleClick = () => push("/admin/articles/create");

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
        push(result.redirectTo);
      }

      if (result.status) {
        setArticles(articles.filter((item) => item._id !== deletedArticle._id));
      }

      handleCloseModal();
    });
  };

  const { notVisibleButton, handleLoad } = usePagination({
    request: getArticles,
    limit: 10,
    params: {
      limit: 10,
      message: "errorDataMessage",
    },
    afterSaveResult: (newArticles: ArticleI[]) =>
      setArticles([...articles, ...newArticles]),
  });

  useEffect(() => {
    getArticles({
      offset: 0,
      limit: 10,
    }).then((result) => {
      if (!result.status) {
        toast(t(result.message as string), {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });
      }

      if (result.responseBody) {
        setArticles(result.responseBody);
      }
    });
  }, [t]);

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
                    alt={article.title[language]}
                  />
                  <h3 className="articleTitle">
                    {/* @ts-ignore */}
                    {article.title[language]}
                  </h3>
                  <span className="articleDescription">
                    {/* @ts-ignore */}
                    {article.description[language]}
                  </span>
                </FormRow>
                <div style={{ marginTop: "auto" }}>
                  <Link
                    className={`${utilsStyles.button} ${utilsStyles.mr15}`}
                    href={`/admin/articles/edit/${article._id}`}
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

        <Pagination
          notVisibleButton={notVisibleButton}
          handleLoad={handleLoad}
        />
      </div>

      <AdminModal
        open={open}
        handleClose={handleCloseModal}
        handleCallback={deleteArticle}
      >
        <p>
          {t("deleteArticleText", {
            /* @ts-ignore */
            title: deletedArticle?.title[language],
          })}
        </p>
      </AdminModal>
    </Dashboard>
  );
};

export default ArticleList;
