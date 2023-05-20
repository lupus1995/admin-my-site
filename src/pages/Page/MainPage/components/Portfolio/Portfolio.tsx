import React, { useEffect, useState } from "react";

import classNames from "classnames";
import Link from "next/link";
import { toast } from "react-toastify";

import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useInitArticles } from "./hooks";
import {
  ArticlesContainer,
  ArticlesContainerSkeleton,
} from "../../../components";

const Portfolio = () => {
  const { t } = useLanguage();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const { articles, visibleSkeleton } = useInitArticles();

  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {t("portfolioTitlePage")}
      </h3>
      {!visibleSkeleton && <ArticlesContainer articles={articles} />}
      {visibleSkeleton && <ArticlesContainerSkeleton />}
      <div className={`${stylesPage.textCenter}`}>
        <Link className={classNames(`${stylesPage.button}`)} href="/articles">
          {t("loadMoreArticle")}
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
