import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton, useStylesClasses } from "utils/stylesPage";

import { ArticlesContainerSkeleton } from "../../../components";

const PortfolioSkeleton = () => {
  const { is360, is481, is721, is1367, is1921, is1081 } = useIsMediaQuery();

  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const skeletonStyle = useStyleSkeleton({
    theme: { is360, is721, is1081, is1367, is1921 },
  });

  return (
    <div
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block}`
      )}
    >
      <div
        data-testid="portfolioTitle"
        className={classNames(
          `${stylesPage.titleBlock} ${skeletonStyle.titleBlockSkeleton} ${skeletonStyle.skeleton}`
        )}
      />

      <ArticlesContainerSkeleton />
    </div>
  );
};

export default PortfolioSkeleton;
