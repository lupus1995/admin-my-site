import React, { FC } from "react";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { ArticleI } from "pages/interface";

import useStyles from "./style";

const ArticleItem: FC<{ article: ArticleI }> = ({ article }) => {
  const { imageUrl } = useImageName({
    imageName: article.thumbnail,
  });

  const style = useStyles();

  return (
    <>
      <img
        className={style.articleTumbnail}
        src={imageUrl}
        // @ts-ignore+
        alt={article.title[language]}
      />
      <h3 className="articleTitle">
        {/* @ts-ignore */}
        {article.title[language]}
      </h3>
      <span className="articleDescription">
        {/* @ts-ignore */}
        {article.description[language]}
      </span>
    </>
  );
};

export default ArticleItem;
