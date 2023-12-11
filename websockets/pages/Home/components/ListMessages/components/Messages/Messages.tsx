import React, { memo } from "react";

import classNames from "classnames";

import { useGetMessages } from "websockets/entities/Messages";
import { useActiveUser } from "websockets/entities/Users";
import { Time } from "websockets/pages/Home/commons";

import { useGetAuthor } from "./hooks";
import useStyles from "./styles";

const Messages = memo(() => {
  const messages = useGetMessages();
  const styles = useStyles();
  const getAuthor = useGetAuthor();
  const activeUser = useActiveUser();

  return (
    <div className={styles.messagesWrapper}>
      {messages.map((message) => (
        <div className={styles.messageWrapper} key={message._id}>
          <span className={styles.messageAuthor}>
            {getAuthor({ from: message.from })}
          </span>
          <div className={styles.messageWrapperItem}>
            <div
              className={classNames(`${styles.messageContainerItem}`, {
                [styles.messageContainerItemBC]:
                  message.from === activeUser._id,
              })}
            >
              <p>{message.value}</p>
            </div>
            <div className={styles.messageTime}>
              <Time date={message.createdAt} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Messages;
