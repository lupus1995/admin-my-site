import React, { FC } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import useStyles from "./style";

const ButtonSubmit: FC<{
  isDisabled: boolean;
  disabledClass: string;
  hasFullWidth?: boolean;
}> = ({ isDisabled, disabledClass, hasFullWidth = true }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <button
      className={classNames(`${styles.buttonSubmit}`, {
        [disabledClass]: isDisabled,
        [styles.buttonWidth]: hasFullWidth,
        [styles.buttonMargin]: !hasFullWidth,
      })}
      type="submit"
    >
      {t("submit")}
    </button>
  );
};

export default ButtonSubmit;
