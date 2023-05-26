import React, { FC } from "react";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { ItemList } from "pages/Admin/widget";
import { ArticleI } from "pages/interface";
import { useLanguage } from "utils/hooks";

const ArticleItem: FC<{ article: ArticleI }> = ({ article }) => {
  const { language } = useLanguage();
  const { imageUrl } = useImageName({
    imageName: article.thumbnail,
  });

  return (
    <ItemList
      src={imageUrl}
      // @ts-ignore
      title={article.title[language]}
      // @ts-ignore
      description={article.description[language]}
    />
  );
};

export default ArticleItem;
