import React, { FC } from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton } from "utils/stylesPage";

import useStyles from "./style";

const ArticleSkeleton: FC = () => {
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
  const skeletonStyle = useStyleSkeleton();

  return (
    <article className={classNames(`${styles.articleContainer}`)}>
      <div className={classNames(`${styles.previewImage}`)} />
      <div
        className={classNames(
          `${styles.articleLinkSkeleton} ${skeletonStyle.skeleton}`
        )}
      ></div>
      <div>
        <div
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        ></div>
        <div
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        ></div>
        <div
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        ></div>
      </div>

      <div className={classNames(`${styles.time}`)}>
        <div
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        ></div>
      </div>
    </article>
  );
};

export default ArticleSkeleton;
