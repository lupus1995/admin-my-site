import React from "react";

import classNames from "classnames";
import Link from "next/link";

import { useIsMediaQuery } from "utils/mediaQuery";
import { useStylesClasses } from "utils/stylesPage";

import useStyles from "./style";
import { WrapperPage } from "../widgets";

const PageNotFound = () => {
  const { is360, is481 } = useIsMediaQuery();
  const stylesPage = useStylesClasses({ theme: { is360, is481 } });
  const styles = useStyles();
  return (
    <WrapperPage>
      <div className={styles.page404Wrapper}>
        <p>Страница не найдена. Обратитесь к владельцу сайта</p>
        <Link className={classNames(`${stylesPage.button}`)} href="/">
          Главная страница
        </Link>
      </div>
    </WrapperPage>
  );
};

export default PageNotFound;
