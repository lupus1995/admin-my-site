import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import Link from "next/link";
import { toast } from "react-toastify";

import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { ArticleI } from "../../../../interface";
import { ArticlesContainer } from "../../../components";

const Portfolio: FC<{ newArticlesResponse: ResponseI<void | ArticleI[]> }> = ({
  newArticlesResponse,
}) => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  useEffect(() => {
    if (!newArticlesResponse.status) {
      toast(newArticlesResponse.message, {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });

      return;
    }

    if (newArticlesResponse.responseBody) {
      setArticles(newArticlesResponse.responseBody);
    }
  }, [newArticlesResponse]);

  return (
    <>
      <div
        className={classNames(
          `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground}`
        )}
      >
        <h3 className={classNames(`${stylesPage.titleBlock}`)}>
          {t("portfolioTitlePage")}
        </h3>
        <ArticlesContainer articles={articles} />
        <div className={`${stylesPage.textCenter}`}>
          <Link className={classNames(`${stylesPage.button}`)} href="/articles">
            {t("loadMoreArticle")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
