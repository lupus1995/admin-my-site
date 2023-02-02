import React, { FC } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useUtilsStyles from "utils/styles";

const LinkToArticleList: FC<{ isDisabled: boolean; disabledClass: string }> = ({
  isDisabled,
  disabledClass,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const utilsStyles = useUtilsStyles();

  const handleClick = () => navigate("/admin/articles");

  return (
    <button
      className={classNames(`${utilsStyles.button}`, {
        [disabledClass]: isDisabled,
      })}
      type="button"
      onClick={handleClick}
    >
      {t("return")}
    </button>
  );
};

export default LinkToArticleList;
