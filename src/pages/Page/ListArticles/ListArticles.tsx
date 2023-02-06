import React, { useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Footer from "commons/Footer";
import Pagination from "commons/Pagination";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { ArticleI } from "../../interface";
import { ArticlesContainer, Header } from "../commons";
import { getArticles } from "./api";
import useStyles from "./style";

// страница сайта для отображения всех статей на сайте
const ListArticle = () => {
  const { t } = useTranslation();
  const { is360, is481 } = useIsMediaQuery();
  const styles = useStyles();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const [articles, setArticles] = useState<ArticleI[]>([]);

  const handleLoad = ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<ArticleI[]> => {
    return getArticles({
      offset,
      limit,
      message: t("errorDataMessage"),
    }).then((result) => {
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        return [];
      }

      if (result.responseBody) {
        setArticles([...articles, ...result.responseBody]);
      }

      return result.responseBody || [];
    });
  };

  return (
    <>
      <Header />

      <div
        className={classNames(
          `${styles.articlesWrapper} ${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.blockBackground}`
        )}
      >
        <ArticlesContainer articles={articles} />
        <Pagination limit={8} handleLoad={handleLoad} />
      </div>
      <Footer />
    </>
  );
};

export default ListArticle;
