import React from "react";

import classNames from "classnames";

import { useGetActiveInterlocutor } from "websockets/entities/Users";

import { FormForMessage, Messages, NameInterlocutor } from "./components";
import useStyles from "./styles";

const ListMessages = () => {
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
