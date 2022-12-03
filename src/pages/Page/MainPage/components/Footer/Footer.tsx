import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Footer = () => {
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles();
  return (
    <footer
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground} ${styles.footer}`
      )}
    >
      &#169; Все права защищены 2022
    </footer>
  );
};

export default Footer;
