import React, { FC, ReactNode } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const InputWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const styles = useStyles();
  return <div className={classNames(`${styles.inputWrapper}`)}>{children}</div>;
};

export default InputWrapper;
