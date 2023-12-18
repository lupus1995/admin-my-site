import React from "react";

import classNames from "classnames";

import { useFetchTypesMessage } from "websockets/entities/Messages";
import { useGetActiveInterlocutor } from "websockets/entities/Users";

import { FormForMessage, Messages, NameInterlocutor } from "./components";
import useStyles from "./styles";

const ListMessages = () => {
  useFetchTypesMessage();
  const styles = useStyles();
  const { activeInterlocutor } = useGetActiveInterlocutor();

  if (!activeInterlocutor) {
    return null;
  }

  return (
    <div className={classNames(`${styles.listMessagesWrapper}`)}>
      <NameInterlocutor />
      <Messages />
      <FormForMessage />
    </div>
  );
};

export default ListMessages;
