import React, { FC } from "react";

import useStyles from "./style";

const FormLabel: FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = useStyles();

  return <p className={styles.label}>{children}</p>;
};

export default FormLabel;
