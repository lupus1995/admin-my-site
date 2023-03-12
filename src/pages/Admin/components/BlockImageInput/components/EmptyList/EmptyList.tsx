import React, { FC } from "react";

import classNames from "classnames";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { EmptyListI } from "./interface";

const EmptyList: FC<EmptyListI> = ({
  disabledClass,
  isDisabled,
  onImageUpload,
  classesForButton,
}) => {
  const { t } = useLanguage();
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
