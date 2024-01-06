import React, { FC, useEffect, useState } from "react";

import { format } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { ArticleI } from "pages/interface";
import { URL } from "utils/constants";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyle from "./style";
import { CustomImage } from "../commons";
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

  const { imageUrl } = useImageName({
    imageName: article?.thumbnail,
  });
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

  if (article === null) {
    return null;
  }

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <title>{article.title[language]}</title>
        {/* @ts-ignore */}
        <meta name="description" content={article.description[language]} />
        {/* @ts-ignore */}
        <meta name="keywords" content={article.keyWords[language]} />

        {/* мета теги для вк */}
        {/* @ts-ignore */}
        <meta name="og:title" content={article.title[language]} />
        <meta name="og:type" content="website" />

        {/* @ts-ignore */}
        <meta
          name="vk:image"
          content={`${URL}/articles/1280/${article._id}/thumbnail`}
        />
        {/* @ts-ignore */}
        <meta
          name="og:image"
          content={`${URL}/articles/510/${article._id}/thumbnail`}
        />
        {/* @ts-ignore */}
        <meta name="og:description" content={article.description[language]} />
      </Head>
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
                <CustomImage
                  className={`${styles.articleImage}`}
                  src={imageUrl}
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
                <time>
                  {format(new Date(article.publishedAt), "dd.MM.yyyy")}
                </time>
              </div>
            </div>
          </>
        )}
      </WrapperPage>
    </>
  );
};

export default Article;
