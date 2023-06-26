import React, { FC } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import Link from "next/link";

import { useImageName } from "commons/HookGetSizeImage/hook";
import Multiline from "pages/Page/commons/Multiline/Multiline";
import { useLanguage } from "utils/hooks";
import { useIsMediaQuery } from "utils/mediaQuery";

import useStyles from "./style";
import { ContentI } from "../../../interface";

const Content: FC<{ contentItem: ContentI }> = ({ contentItem }) => {
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
    imageName: contentItem.thumbnail,
  });

  return (
    <article className={classNames(`${styles.contentContainer}`)}>
      <div>
        <img
          data-testid={imageUrl}
          className={classNames(`${styles.previewImage}`)}
          src={imageUrl}
        />
      </div>
      <Link className={`${styles.previewLink}`} href={contentItem.url}>
        <Multiline numberLine={2}>
          <h4 className={classNames(`${styles.previewTitle}`)}>
            {/* @ts-ignore */}
            {contentItem.title[language]}
          </h4>
        </Multiline>
      </Link>
      <Multiline numberLine={3}>
        <p className={classNames(`${styles.previewDescription}`)}>
          {/* @ts-ignore */}
          {contentItem.description[language]}
        </p>
      </Multiline>

      <div className={classNames(`${styles.time}`)}>
        <time>{format(new Date(contentItem.publishedAt), "dd.MM.yyyy")}</time>
      </div>
    </article>
  );
};

export default Content;