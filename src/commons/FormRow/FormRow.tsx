import React, { FC } from "react";

import useStyles from "./style";

const FormRow: FC = ({ children }) => {
  const style = useStyles();
  return <div className={style.formRow}>{children}</div>;
};

export default FormRow;
