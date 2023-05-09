import React, { FC } from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";

import ArticleSkeleton from "./ArticleSkeleton";
import useStyles from "./style";

const ArticlesContainerSkeleton: FC = () => {
  const {
    is360,
    is481,
    is721,
    is1367,
    is1921,
    is1081,
    isMin1367AndMax1920,
    isMin1081AndMax1366,
    isMin721AndMax1080,
    isMin1600AndMax1920,
    isMin1367AndMax1600,
  } = useIsMediaQuery();
  const styles = useStyles({
    theme: {
      is360,
      is481,
      is721,
      is1367,
      is1921,
      is1081,
      isMin1367AndMax1920,
      isMin1081AndMax1366,
      isMin721AndMax1080,
      isMin1600AndMax1920,
      isMin1367AndMax1600,
    },
  });

  return (
    <div className={classNames(`${styles.articlesContainer}`)}>
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
    </div>
  );
};

export default ArticlesContainerSkeleton;
