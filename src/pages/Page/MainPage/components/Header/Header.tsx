import React from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { languages } from "utils/constants";
import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { is360, is481, is721 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481, is721 } });
  return (
    <header
      className={classNames(
        `${stylesPage.container} ${styles.navigationWrapper}`
      )}
    >
      <nav
        className={classNames(
          `${styles.navigationContainer} ${stylesPage.wrapper}`
        )}
      >
        <span>
          <a className={classNames(`${styles.navItemLink}`)} href="#">
            WFC
          </a>
        </span>
        <ul className={classNames(`${styles.nav}`)}>
          <li className={classNames(`${styles.navItem}`)}>
            <a className={classNames(`${styles.navItemLink}`)} href="#">
              {t("aboutMeTitlePage")}
            </a>
          </li>
          <li className={classNames(`${styles.navItem}`)}>
            <a className={classNames(`${styles.navItemLink}`)} href="#">
              {t("portfolioTitlePage")}
            </a>
          </li>
          <li className={classNames(`${styles.navItem}`)}>
            <a className={classNames(`${styles.navItemLink}`)} href="#">
              {t("contactsTitlePage")}
            </a>
          </li>

          <li className={classNames(`${styles.navItem}`)}>
            <button
              onClick={() => {
                i18n.changeLanguage(languages.ru);
              }}
              className={classNames(`${styles.navItemLink}`, {
                [styles.activeButton]: i18n.language === languages.ru,
              })}
            >
              ru
            </button>
            <span className={styles.buttonSeparator}>|</span>
            <button
              onClick={() => {
                i18n.changeLanguage(languages.en);
              }}
              className={classNames(`${styles.navItemLink}`, {
                [styles.activeButton]: i18n.language === languages.en,
              })}
            >
              en
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
