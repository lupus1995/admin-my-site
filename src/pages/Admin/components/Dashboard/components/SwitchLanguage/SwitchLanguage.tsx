import React, { useCallback } from "react";

import classNames from "classnames";

import { languages } from "utils/constants";
import { useLanguage } from "utils/hooks";

import useStyles from "../../style";

const SwitchLanguage = () => {
  const style = useStyles();
  const { changeLanguage, language: i18nLanguage } = useLanguage();
  const handleChangeLanguage = useCallback(
    ({ language }: { language: string }) => {
      changeLanguage(language);
    },
    [changeLanguage]
  );

  const handleChangeRus = useCallback(() => {
    handleChangeLanguage({ language: languages.ru });
  }, [handleChangeLanguage]);

  const handleChangeEn = useCallback(() => {
    handleChangeLanguage({ language: languages.en });
  }, [handleChangeLanguage]);

  return (
    <li className={classNames(style.dashboardLinkWrapper)}>
      <button
        onClick={handleChangeRus}
        className={classNames({
          [style.dashboardLink]: true,
          [style.dashboardButton]: true,
          [style.activeLanguage]: i18nLanguage === languages.ru,
        })}
        type="button"
      >
        RUS
      </button>
      <span className={style.languageSeparator}>|</span>
      <button
        onClick={handleChangeEn}
        className={classNames({
          [style.dashboardLink]: true,
          [style.dashboardButton]: true,
          [style.activeLanguage]: i18nLanguage === languages.en,
        })}
        type="button"
      >
        EN
      </button>
    </li>
  );
};

export default SwitchLanguage;
