import React from "react";

import classNames from "classnames";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";

const Header = () => {
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles({ theme: { is360, is481 } });
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
              Обо мне
            </a>
          </li>
          <li className={classNames(`${styles.navItem}`)}>
            <a className={classNames(`${styles.navItemLink}`)} href="#">
              Потрфолио
            </a>
          </li>
          <li className={classNames(`${styles.navItem}`)}>
            <a className={classNames(`${styles.navItemLink}`)} href="#">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
