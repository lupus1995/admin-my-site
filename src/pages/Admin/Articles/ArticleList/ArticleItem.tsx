import React, { FC } from "react";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { FormRow } from "pages/Admin/commons";
import { ArticleI } from "pages/interface";
import { useLanguage } from "utils/hooks";

import useStyles from "./style";

const ArticleItem: FC<{ article: ArticleI }> = ({ article }) => {
  const { language } = useLanguage();
  const { imageUrl } = useImageName({
    imageName: article.thumbnail,
  });

  const style = useStyles();

  return (
    <FormRow>
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
    </FormRow>
  );
};

export default ArticleItem;
