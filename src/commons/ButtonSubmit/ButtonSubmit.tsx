import React, { FC } from "react";

import classNames from "classnames";

import useStyles from "./style";

const ButtonSubmit: FC<{ isDisabled: boolean; disabledClass: string }> = ({
  isDisabled,
  disabledClass,
}) => {
  const styles = useStyles();

  return (
    <button
      className={classNames(`${styles.buttonSubmit}`, {
        [disabledClass]: isDisabled,
      })}
      type="submit"
    >
      Отправить
    </button>
  );
};

export default ButtonSubmit;
