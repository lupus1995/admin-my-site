import React, { FC, ReactNode } from "react";

import classNames from "classnames";

import useStyles from "./styles";

const InputWrapperError: FC<{
  visibleError: boolean;
  children: ReactNode;
}> = ({ visibleError, children }) => {
  const styles = useStyles();

  if (!visibleError) {
    return null;
  }

  return (
    <small className={classNames(`p-error ${styles.inputError}`)}>
      {children}
    </small>
  );
};

export default InputWrapperError;
