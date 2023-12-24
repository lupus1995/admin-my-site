import React, { memo, useCallback, useEffect } from "react";

import classNames from "classnames";

import { useGetMessages } from "websockets/entities/Messages";
import { useActiveUser } from "websockets/entities/Users";
import { Time } from "websockets/pages/Home/commons";

import {
  useGetAuthor,
  useLoadMessagesByScroll,
  useScrollToLastChildAfterFirstRender,
} from "./hooks";
import useStyles from "./styles";

const Messages = memo(
  ({
    handleClickByDonwload,
  }: {
    handleClickByDonwload: () => Promise<void>;
  }) => {
    const messages = useGetMessages();
    const styles = useStyles();
    const getAuthor = useGetAuthor();
    const activeUser = useActiveUser();
    const { refObserver, entry } = useScrollToLastChildAfterFirstRender({
      messages,
    });
    const { refFirstElement } = useLoadMessagesByScroll();

    const handleRef = useCallback(
      (index: number) => (ref: Element) => {
        if (index === 5) {
          refFirstElement(ref);
        }
      },
      [refFirstElement]
    );

    useEffect(() => {
      if (entry?.target.scrollHeight > 2302) {
        entry.target.scrollTo({ top: 2302 });
      }
    }, [entry?.target]);

    return (
      <div ref={refObserver} className={styles.messagesWrapper}>
        {messages.map((message, index) => (
          <>
            {/* {index === 0 && (
              <button onClick={handleClickByDonwload}>Load data</button>
            )} */}
            <div
              ref={handleRef(index)}
              className={styles.messageWrapper}
              key={message._id}
            >
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
          </>
        ))}
      </div>
    );
  }
);

export default Messages;
