import React, { FC } from "react";

import useStyles from "./style";

const FormRow: FC<{ children: React.ReactNode; classname?: string }> = ({
  children,
  classname = "",
}) => {
  const style = useStyles();
  return <div className={`${style.formRow} ${classname}`}>{children}</div>;
};

export default FormRow;
