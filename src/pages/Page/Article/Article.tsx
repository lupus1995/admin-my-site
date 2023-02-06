import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Footer from "commons/Footer";
import { ArticleI } from "pages/interface";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import { Header } from "../commons";
import { getArticle, getArticleForAdmin } from "./api";
import useStyle from "./style";

// страница сайта для отрисовки отдельной статьи
const Article = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { is360, is481 } = useIsMediaQuery();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("isAdmin");
  const [article, setArticle] = useState<ArticleI | null>(null);
  const styles = useStyle();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  useEffect(() => {
    if (!article) {
      const params = { id, isAdmin, message: t("errorDataMessage") };
      const request = isAdmin === "true" ? getArticleForAdmin : getArticle;
      request(params).then((result) => {
        if (!result.status) {
          toast(result.message, {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          if (result.redirectTo) {
            navigate(result.redirectTo);
          }

          return;
        }

        if (result.responseBody) {
          setArticle(result.responseBody);
        }
      });
    }
  }, [article, id, isAdmin, navigate, t]);

  return (
    <>
      <Header />
      {article && (
        <>
          <div
            className={`${styles.articleWrapper} ${stylesPage.wrapper} ${stylesPage.container}`}
          >
            <h3 className={styles.previewTitle}>
              {/* @ts-ignore */}
              {article.title[i18n.language]}
            </h3>
            <div className={`${styles.articleImageContainer}`}>
              <img
                className={`${styles.articleImage}`}
                src={article.thumbnail}
                // @ts-ignore
                alt={article.title[i18n.language]}
              />
            </div>

            <div
              className={styles.articleText}
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: article.text[i18n.language] }}
            />
            <div className={`${styles.articlePublishedDate}`}>
              <time>{format(new Date(article.publishedAt), "dd.MM.yyyy")}</time>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Article;
