import React, { FC } from "react";

import classNames from "classnames";

import { MessageI } from "websockets/entities/share/types";
import { useActiveUser } from "websockets/entities/Users";
import { Time } from "websockets/pages/Home/commons";

import useStyles from "./style";
import { useGetAuthor } from "../../hooks";

export const MessageItem: FC<{ message: MessageI }> = ({ message }) => {
  const getAuthor = useGetAuthor();
  const activeUser = useActiveUser();
  const styles = useStyles();
  return (
    <div className={styles.messageWrapper} key={message._id}>
      <span className={styles.messageAuthor}>
        {getAuthor({ from: message.from })}
      </span>
      <div className={styles.messageWrapperItem}>
        <div
          className={classNames(`${styles.messageContainerItem}`, {
            [styles.messageContainerItemBC]: message.from === activeUser._id,
          })}
        >
          <p>{message.value}</p>
        </div>
        <div className={styles.messageTime}>
          <Time date={message.createdAt} />
        </div>
      </div>
    </div>
  );
};
