import React, { FC } from "react";

import classNames from "classnames";

import { useGetActiveInterlocutor } from "websockets/entities/Users";

import { FormForMessage, Messages, NameInterlocutor } from "./components";
import useStyles from "./styles";

const ListMessages: FC<{
  handleClickByDonwload: () => Promise<void>;
}> = ({ handleClickByDonwload }) => {
  const styles = useStyles();
  const { activeInterlocutor } = useGetActiveInterlocutor();

  if (!activeInterlocutor) {
    return null;
  }

  return (
    <div className={classNames(`${styles.listMessagesWrapper}`)}>
      <NameInterlocutor />
      <Messages handleClickByDonwload={handleClickByDonwload} />
      <FormForMessage />
    </div>
  );
};

export default ListMessages;
