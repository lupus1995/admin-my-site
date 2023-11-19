import React, { FC, ReactNode } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const ButtonWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const styles = useStyles();
  return <div className={classNames(`${styles.button}`)}>{children}</div>;
};

export default ButtonWrapper;
