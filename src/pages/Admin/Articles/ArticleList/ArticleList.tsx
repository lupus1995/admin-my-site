import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Pagination from "components/Pagination";
import { usePagination } from "components/Pagination/hooks";
import { FormRow, Title, MessageForEmptyList } from "pages/Admin/commons";
import { Dashboard, AdminModal } from "pages/Admin/components";
import { useSession } from "pages/Admin/hooks";
import { ItemWrapper } from "pages/Admin/widget";
import { useAppDispatch } from "store/hooks";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { getArticles } from "./api";
import ArticleItem from "./ArticleItem";
import { limit as limitDefault } from "./constants";
import { useArticleModal } from "./hooks";
import useStyles from "./style";
import { ArticleI } from "../../../interface";

const ArticleList = () => {
  useSession();
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const { push } = useRouter();
  const style = useStyles();
  const {
    toggleModal,
    handleOpenModal,
    handleCloseModal,
    handleDeletedArticle,
    deletedArticle,
  } = useArticleModal({ articles, setArticles });

  const dispatch = useAppDispatch();
  const utilsStyles = useUtilsStyles();
  const handleClick = () => push("/admin/articles/create");

  const request = ({ offset, limit }: { offset: number; limit: number }) =>
    dispatch(getArticles({ offset, limit }));

  const { notVisibleButton, handleLoad } = usePagination({
    request,
    limit: limitDefault,
    params: {
      limit: limitDefault,
      message: "errorDataMessage",
    },
    afterSaveResult: (newArticles: ArticleI[]) =>
      setArticles([...articles, ...newArticles]),
  });

  useEffect(() => {
    dispatch(
      getArticles({
        offset: 0,
        limit: limitDefault,
      })
    ).then((result) => {
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
  }, [dispatch, t]);

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
              <ItemWrapper
                handleClick={() => handleOpenModal(article)}
                key={article._id}
                href={`/admin/articles/edit/${article._id}`}
              >
                <ArticleItem article={article} />
              </ItemWrapper>
            ))}
          </div>
        )}

        <Pagination
          notVisibleButton={notVisibleButton || articles.length < limitDefault}
          handleLoad={handleLoad}
        />
      </div>

      <AdminModal
        open={toggleModal}
        handleClose={handleCloseModal}
        handleCallback={handleDeletedArticle}
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
