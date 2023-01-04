import React, { FC } from "react";

import useStyles from "./styles";

const SpaceBetween: FC = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.spaceBetween}>{children}</div>;
};

export default SpaceBetween;
