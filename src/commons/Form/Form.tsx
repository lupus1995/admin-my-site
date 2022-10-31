import React, { FC } from "react";

import classNames from "classnames";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";

import useStyles from "./style";
import { FORM_POSITION_TYPE } from "./types";

const Form: FC<{
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  className?: string;
  formPosition: FORM_POSITION_TYPE;
}> = ({ children, handleSubmit, onSubmit, className = "", formPosition }) => {
  const styles = useStyles({ alignItems: formPosition });

  return (
    <div className={`${styles.formWrapper}`}>
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
