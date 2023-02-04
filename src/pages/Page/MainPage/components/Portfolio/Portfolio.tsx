import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { ArticleI } from "../../../../interface";
import { getNewArticles } from "./api";
import useStyles from "./style";

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [isInitData, setIsInitData] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleI[]>([]);
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
          <h3 className={classNames(`${stylesPage.titleBlock}`)}>Портфолио</h3>
          <div className={classNames(`${styles.articlesContainer}`)}>
            {articles.map((article) => (
              <div
                key={article._id}
                className={classNames(`${styles.articleContainer}`)}
              >
                <img
                  className={classNames(`${styles.previewImage}`)}
                  src={article.thumbnail}
                  alt="1"
                />
                <h4
                  className={classNames(
                    `${styles.previewTitle} ${styles.multilineEllipsis}`
                  )}
                >
                  {/* @ts-ignore */}
                  {article.title[i18n.language]}
                </h4>
                <p className={classNames(`${styles.previewDescription}`)}>
                  {/* @ts-ignore */}
                  {article.description[i18n.language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
