import React, { FC } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import Link from "next/link";

import Multiline from "pages/Page/commons/Multiline/Multiline";
import { useImageName } from "pages/Page/widgets/HookGetSizeImage/hook";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";

import useStyles from "./style";
import { ArticleI } from "../../../interface";

const Article: FC<{ article: ArticleI }> = ({ article }) => {
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
    isMinDevicePixelRatio,
  } = useIsMediaQuery();

  const { language } = useLanguage();
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

  const { imageUrl } = useImageName({
    imageName: article.thumbnail,
    is360,
    is481,
    is721,
    is1081,
    is1367,
    is1921,
    isMinDevicePixelRatio,
  });

  return (
    <article className={classNames(`${styles.articleContainer}`)}>
      <div>
        <img className={classNames(`${styles.previewImage}`)} src={imageUrl} />
      </div>
      <Link
        className={`${styles.previewLink}`}
        href={`/article/${article._id}`}
      >
        <Multiline numberLine={2}>
          <h4 className={classNames(`${styles.previewTitle}`)}>
            {/* @ts-ignore */}
            {article.title[language]}
          </h4>
        </Multiline>
      </Link>
      <Multiline numberLine={3}>
        <p className={classNames(`${styles.previewDescription}`)}>
          {/* @ts-ignore */}
          {article.description[language]}
        </p>
      </Multiline>

      <div className={classNames(`${styles.time}`)}>
        <time>{format(new Date(article.publishedAt), "dd.MM.yyyy")}</time>
      </div>
    </article>
  );
};

export default Article;
