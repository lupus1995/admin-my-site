import React, { useCallback } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { languages } from "utils/constants";

import useStyles from "../../style";

const SwitchLanguage = () => {
  const style = useStyles();
  const { i18n } = useTranslation();
  const handleChangeLanguage = useCallback(
    ({ language }) => {
      i18n.changeLanguage(language);
    },
    [i18n]
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
          [style.activeLanguage]: i18n.language === languages.ru,
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
          [style.activeLanguage]: i18n.language === languages.en,
        })}
        type="button"
      >
        EN
      </button>
    </li>
  );
};

export default SwitchLanguage;
