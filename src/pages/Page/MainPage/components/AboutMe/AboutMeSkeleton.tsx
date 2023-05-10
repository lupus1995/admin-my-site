import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton, useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const AboutMeSkeleton = () => {
  const { is360, is481, is721, is1081, is1367, is1601, is1921 } =
    useIsMediaQuery();
  const styles = useStyles({ theme: { is1081 } });
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const skeletonStyle = useStyleSkeleton({
    theme: { is360, is721, is1081, is1367, is1601, is1921 },
  });

  return (
    <div
      data-testid="aboutMeWrapper"
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block}`
      )}
    >
      <div
        data-testid="aboutMeTitle"
        className={classNames(
          `${stylesPage.titleBlock} ${skeletonStyle.titleBlockSkeleton} ${skeletonStyle.skeleton}`
        )}
      />

      <div
        data-testid="aboutMeContainer"
        className={classNames(`${styles.aboutMe}`)}
      >
        <div
          data-testid="aboutMePhoto"
          className={classNames(
            `${styles.aboutMePhoto} ${styles.aboutMeBlockSkeleton} ${skeletonStyle.skeleton}`
          )}
        />
        <article
          data-testid="aboutMeArticle"
          className={classNames(
            `${styles.aboutMeArticle} ${styles.aboutMeBlockSkeleton} ${skeletonStyle.skeleton}`
          )}
        ></article>
      </div>
    </div>
  );
};

export default AboutMeSkeleton;
