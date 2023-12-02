import React from "react";

import classNames from "classnames";

import { NameInterlocutor } from "./components";
import useStyles from "./styles";

const ListMessages = () => {
  const styles = useStyles();

  return (
    <div className={classNames(`${styles.listMessagesWrapper}`)}>
      <NameInterlocutor />
    </div>
  );
};

export default ListMessages;
