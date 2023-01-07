import React from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Footer = () => {
  const { t } = useTranslation();
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles();
  return (
    <footer
      className={classNames(
        `${stylesPage.wrapper} ${stylesPage.container} ${stylesPage.block} ${stylesPage.blockBackground} ${styles.footer}`
      )}
    >
      &#169; {t("copyright")} 2022
    </footer>
  );
};

export default Footer;
