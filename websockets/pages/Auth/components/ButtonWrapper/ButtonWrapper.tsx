import React, { FC } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const ButtonWrapper: FC = ({ children }) => {
  const styles = useStyles();
  return <div className={classNames(`${styles.button}`)}>{children}</div>;
};

export default ButtonWrapper;
