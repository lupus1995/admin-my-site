import React, { FC, ReactNode } from "react";

import useStyles from "./styles";

const SpaceBetween: FC<{ children: ReactNode }> = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.spaceBetween}>{children}</div>;
};

export default SpaceBetween;
