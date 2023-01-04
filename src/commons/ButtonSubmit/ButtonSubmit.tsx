import React, { FC } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import useStyles from "./style";

const ButtonSubmit: FC<{ isDisabled: boolean; disabledClass: string }> = ({
  isDisabled,
  disabledClass,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <button
      className={classNames(`${styles.buttonSubmit}`, {
        [disabledClass]: isDisabled,
      })}
      type="submit"
    >
      {t("submit")}
    </button>
  );
};

export default ButtonSubmit;
