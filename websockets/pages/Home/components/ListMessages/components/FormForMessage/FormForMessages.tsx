import React from "react";

import classNames from "classnames";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";

import {
  CreateMessageI,
  useCreateMessage,
  useGetRoomId,
  useGetTypesMessage,
} from "websockets/entities/Messages";
import {
  useActiveUser,
  useGetActiveInterlocutor,
  useUpdateInterlocutor,
} from "websockets/entities/Users";

import useStyles from "./style";

const FormForMessages = () => {
  const { handleCreateMessage } = useCreateMessage();
  const typeMessage = useGetTypesMessage();
  const { handleUpdateInterlocutor } = useUpdateInterlocutor();
  const activeRoomId = useGetRoomId();
  const { activeInterlocutor } = useGetActiveInterlocutor();
  const activeUser = useActiveUser();
  const { register, handleSubmit, setValue } = useForm();

  const style = useStyles();

  const onSubmit = ({ message }: { message: string }) => {
    const newMessage: CreateMessageI = {
      from: activeUser._id,
      to: activeInterlocutor._id,
      typeMessage: typeMessage.TEXT,
      value: message,
      roomId: activeRoomId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    handleCreateMessage(newMessage);
    handleUpdateInterlocutor(activeRoomId);
    setValue("message", "");
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
