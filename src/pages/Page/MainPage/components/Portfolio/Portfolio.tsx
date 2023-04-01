import React, { useEffect, useState } from "react";

import classNames from "classnames";
import Link from "next/link";
import { toast } from "react-toastify";

import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { getNewArticles } from "./api";
import { ArticleI } from "../../../../interface";
import { ArticlesContainer } from "../../../components";

const Portfolio = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  useEffect(() => {
    getNewArticles({
      message: "errorDataMessage",
    }).then((newArticlesResponse) => {
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
    });
  }, []);

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
