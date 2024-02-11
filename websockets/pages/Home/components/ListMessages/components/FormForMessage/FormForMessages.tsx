import React from "react";

import classNames from "classnames";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

import { useHandleSubmit } from "./hooks";
import useStyles from "./style";

const FormForMessages = () => {
  const style = useStyles();
  const { handleSubmit, onSubmit, register } = useHandleSubmit();

  const handleClick = () => {
    console.log("click");
  };

  return (
    <form
      className={classNames(`${style.formWrapper}`)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTextarea
        className={classNames(`${style.textAreaWrapper}`)}
        {...register("message", {
          required: "Поле обязательно",
        })}
      />
      <div className={classNames(`${style.formButton}`)}>
        <Button label="Отправить" type="submit" icon="pi pi-check" />
        <Button
          label="Звонок"
          type="button"
          onClick={handleClick}
          icon="pi pi-check"
        />
      </div>
    </form>
  );
};

export default FormForMessages;
