import React, { FC, useState } from "react";

import classNames from "classnames";

import Pagination from "components/Pagination";
import { usePagination } from "components/Pagination/hooks";
import { ResponseI } from "utils/interfaces";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { getArticles } from "./api";
import { limit } from "./constants";
import useStyles from "./style";
import { ArticleI } from "../../interface";
import { ArticlesContainer } from "../components";
import { WrapperPage } from "../widgets";

// страница сайта для отображения всех статей на сайте
const Articles: FC<{ response: ResponseI<void | ArticleI[]> }> = ({
  response,
}) => {
  const { is360, is481 } = useIsMediaQuery();
  const styles = useStyles();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const [articles, setArticles] = useState<ArticleI[]>(
    response?.responseBody || []
  );

  const { notVisibleButton, handleLoad } = usePagination({
    request: getArticles,
    limit,
    params: {
      limit,
      message: "errorDataMessage",
    },
    afterSaveResult: (newArticles: ArticleI[]) =>
      setArticles([...articles, ...newArticles]),
  });

  return (
    <>
      <WrapperPage>
        <div
          className={classNames(
            `${styles.articlesWrapper} ${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.blockBackground}`
          )}
        >
          <ArticlesContainer articles={articles} />
          <Pagination
            notVisibleButton={notVisibleButton}
            handleLoad={handleLoad}
          />
        </div>
      </WrapperPage>
    </>
  );
};

export default Articles;
