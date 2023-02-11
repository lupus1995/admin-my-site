import React, { useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Pagination from "components/Pagination";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { ArticleI } from "../../interface";
import { ArticlesContainer } from "../components";
import { WrapperPage } from "../widgets";
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
      <WrapperPage>
        <div
          className={classNames(
            `${styles.articlesWrapper} ${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.blockBackground}`
          )}
        >
          <ArticlesContainer articles={articles} />
          <Pagination limit={8} handleLoad={handleLoad} />
        </div>
      </WrapperPage>
    </>
  );
};

export default ListArticle;
