import React, { useState } from "react";

import classNames from "classnames";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

import { ModalRTC } from "./components";
import { useHandleSubmit } from "./hooks";
import useStyles from "./style";

const FormForMessages = () => {
  const style = useStyles();
  const { handleSubmit, onSubmit, register } = useHandleSubmit();

  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
  };
  const handleClose = () => setVisible(false);
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
        {visible && <ModalRTC handleClose={handleClose} />}
      </div>
    </form>
  );
};

export default FormForMessages;
