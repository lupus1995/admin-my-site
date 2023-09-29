import React, { FC } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const InputWrapper: FC = ({ children }) => {
  const styles = useStyles();
  return <div className={classNames(`${styles.inputWrapper}`)}>{children}</div>;
};

export default InputWrapper;
