import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStyleSkeleton, useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const FooterSkeleton = () => {
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles();
  const skeletonStyle = useStyleSkeleton();
  return (
    <footer
      data-testid="footerSkeleton"
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground} ${styles.footer} ${skeletonStyle.skeletonLine} ${skeletonStyle.skeleton}`
      )}
    />
  );
};

export default FooterSkeleton;
