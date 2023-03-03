import React, { FC } from "react";

import classNames from "classnames";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import useUtilsStyles from "utils/styles";

const LinkToArticleList: FC<{ isDisabled: boolean; disabledClass: string }> = ({
  isDisabled,
  disabledClass,
}) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const utilsStyles = useUtilsStyles();

  const handleClick = () => push("/admin/articles");

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
