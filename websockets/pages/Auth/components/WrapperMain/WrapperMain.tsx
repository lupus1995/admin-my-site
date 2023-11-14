import React, { FC, ReactNode } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const WrapperMain: FC<{ children: ReactNode }> = ({ children }) => {
  const styles = useStyles();
  return <main className={classNames(`${styles.main}`)}>{children}</main>;
};

export default WrapperMain;
