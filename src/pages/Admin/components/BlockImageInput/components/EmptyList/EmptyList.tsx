import React, { FC } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import useUtilsStyles from "utils/styles";

import { EmptyListI } from "./interface";

const EmptyList: FC<EmptyListI> = ({
  disabledClass,
  isDisabled,
  onImageUpload,
  classesForButton,
}) => {
  const { t } = useTranslation();
  const utilsStyles = useUtilsStyles();
  return (
    <button
      className={classNames(`${utilsStyles.button} ${classesForButton}`, {
        [disabledClass]: isDisabled,
      })}
      type="button"
      onClick={onImageUpload}
    >
      {t("loadImage")}
    </button>
  );
};

export default EmptyList;
