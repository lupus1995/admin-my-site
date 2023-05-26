import React, { FC } from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton } from "utils/stylesPage";

import useStyles from "./style";

const ContentSkeleton: FC = () => {
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
    <article
      data-testid="contentContainer"
      className={classNames(`${styles.contentContainer}`)}
    >
      <div className={classNames(`${styles.previewImage}`)} />
      <div
        data-testid="contentLinkSkeleton"
        className={classNames(
          `${styles.contentLinkSkeleton} ${skeletonStyle.skeleton}`
        )}
      />
      <div>
        <div
          data-testid="skeletonLine"
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        />
        <div
          data-testid="skeletonLine"
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        />
        <div
          data-testid="skeletonLine"
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        />
      </div>

      <div data-testid="time" className={classNames(`${styles.time}`)}>
        <div
          className={classNames(
            `${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
          )}
        ></div>
      </div>
    </article>
  );
};

export default ContentSkeleton;
