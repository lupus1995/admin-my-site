import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { ArticleI } from "../../../../interface";
import { ArticlesContainer } from "../../../commons";
import { getNewArticles } from "./api";

const Portfolio = () => {
  const { t } = useTranslation();
  const [isInitData, setIsInitData] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  useEffect(() => {
    getNewArticles({ message: t("errorDataMessage") }).then((result) => {
      setIsInitData(true);
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        return;
      }

      if (result.responseBody) {
        setArticles(result.responseBody);
      }
    });
  }, [t]);

  return (
    <>
      {isInitData && (
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
            <Link className={classNames(`${stylesPage.button}`)} to="/articles">
              {t("loadMoreArticle")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
