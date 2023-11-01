import React, { FC } from "react";

import useStyles from "../../style";

const AdminBody: FC<{ children: React.ReactNode }> = ({ children }) => {
  const style = useStyles();
  return <div className={`${style.modalContent}`}>{children}</div>;
};

export default AdminBody;
