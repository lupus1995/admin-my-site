import React from "react";

import classNames from "classnames";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";

import useStyles from "./style";

const FormForMessages = () => {
  const { register, handleSubmit } = useForm();

  const style = useStyles();

  const onSubmit = ({ message }: { message: string }) => {
    console.log("message", message);
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
      </div>
    </form>
  );
};

export default FormForMessages;
