import React, { FC } from "react";

import useStyles from "./style";

const Title: FC<{ title: string }> = ({ title }) => {
  const styles = useStyles();

  return <h3 className={styles.pageTitle}>{title}</h3>;
};

export default Title;
