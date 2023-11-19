import React, { FC, ReactNode } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const WrapperForm: FC<{ onSubmit: () => void; children: ReactNode }> = ({
  onSubmit,
  children,
}) => {
  const styles = useStyles();

  return (
    <form className={classNames(`${styles.form}`)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default WrapperForm;
