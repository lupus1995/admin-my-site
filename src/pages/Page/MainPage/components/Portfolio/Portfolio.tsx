import React from "react";

import classNames from "classnames";
import Link from "next/link";

import { useGetConents } from "pages/Page/components/Content/hooks";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { useInitArticles } from "./hooks";
import {
  ContentsContainer,
  ContentsContainerSkeleton,
} from "../../../components";

const Portfolio = () => {
  const { t } = useLanguage();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const { articles, visibleSkeleton } = useInitArticles();

  const contents = useGetConents(articles, "article");

  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground}`
      )}
    >
      <h3 className={classNames(`${stylesPage.titleBlock}`)}>
        {t("portfolioTitlePage")}
      </h3>
      {!visibleSkeleton && <ContentsContainer contents={contents} />}
      {visibleSkeleton && <ContentsContainerSkeleton />}
      <div className={`${stylesPage.textCenter}`}>
        <Link className={classNames(`${stylesPage.button}`)} href="/articles">
          {t("loadMoreArticle")}
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
