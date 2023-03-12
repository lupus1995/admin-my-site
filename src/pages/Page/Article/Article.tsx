import React, { FC, useEffect, useState } from "react";

import { format } from "date-fns";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { ArticleI } from "pages/interface";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyle from "./style";
import { WrapperPage } from "../widgets";

// страница сайта для отрисовки отдельной статьи
const Article: FC<{ response: ResponseI<void | ArticleI> }> = ({
  response,
}) => {
  const router = useRouter();
  const { push } = router;
  const { t, language } = useLanguage();
  const { is360, is481 } = useIsMediaQuery();
  // если в ответе есть responseBody (статья), то сразу ее отрисовываем
  const [article, setArticle] = useState<ArticleI | null>(
    response?.responseBody ? response?.responseBody : null
  );
  const styles = useStyle();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });

  // сайд эффект остался для сценария, когда статья не прогрузилась и в этом случае необходимо отобразить ошибку
  // ошибка выводится в виде сообщеня попапа в правом верхнем углу
  useEffect(() => {
    if (!response.status) {
      toast(t(response.message as string), {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });

      if (response.redirectTo) {
        push(response.redirectTo);
      }

      return;
    }

    if (response.responseBody) {
      setArticle(response.responseBody);
    }
  }, [article, push, response, t]);

  return (
    <WrapperPage>
      {article && article !== null && (
        <>
          <div
            className={`${styles.articleWrapper} ${stylesPage.wrapper} ${stylesPage.container}`}
          >
            <h3 className={styles.previewTitle}>
              {/* @ts-ignore */}
              {article.title[language]}
            </h3>
            <div className={`${styles.articleImageContainer}`}>
              <img
                className={`${styles.articleImage}`}
                src={article.thumbnail}
                // @ts-ignore
                alt={article.title[language]}
              />
            </div>

            <div
              className={styles.articleText}
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: article.text[language] }}
            />
            <div className={`${styles.articlePublishedDate}`}>
              <time>{format(new Date(article.publishedAt), "dd.MM.yyyy")}</time>
            </div>
          </div>
        </>
      )}
    </WrapperPage>
  );
};

export default Article;
