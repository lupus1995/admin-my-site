import React, { FC } from "react";

import classNames from "classnames";

import { FormI } from "./interface";
import useStyles from "./style";

const Form: FC<FormI> = ({
  children,
  handleSubmit,
  onSubmit,
  className = "",
  formPosition,
  isCenter = false,
}) => {
  const styles = useStyles({ alignItems: formPosition });

  return (
    <div
      className={classNames(`${styles.formWrapper}`, {
        [styles.formCenter]: isCenter,
      })}
    >
      <form
        className={classNames(`${styles.form} ${className}`)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </div>
  );
};

export default Form;
