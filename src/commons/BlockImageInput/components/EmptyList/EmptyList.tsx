import React, { FC } from "react";

import classNames from "classnames";

import useUtilsStyles from "utils/styles";

import { EmptyListI } from "./interface";

const EmptyList: FC<EmptyListI> = ({
  disabledClass,
  isDisabled,
  onImageUpload,
  classesForButton,
}) => {
  const utilsStyles = useUtilsStyles();
  return (
    <button
      className={classNames(`${utilsStyles.button} ${classesForButton}`, {
        [disabledClass]: isDisabled,
      })}
      type="button"
      onClick={onImageUpload}
    >
      Загрузить картинку
    </button>
  );
};

export default EmptyList;
