import classNames from "classnames";
import React, { FC } from "react";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";
import useStyles from "./style";

const Form: FC<{
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  className?: string;
}> = ({ children, handleSubmit, onSubmit, className = "" }) => {
  const styles = useStyles();

  return (
    <div className={styles.formWrapper}>
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
