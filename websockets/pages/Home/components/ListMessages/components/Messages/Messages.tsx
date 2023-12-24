import React, { memo, useEffect, useRef } from "react";

import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroller";

import { useGetMessages } from "websockets/entities/Messages";
import { useActiveUser } from "websockets/entities/Users";
import { Time } from "websockets/pages/Home/commons";

import { useGetAuthor } from "./hooks";
import useStyles from "./styles";

const Messages = memo(
  ({
    handleClickByDonwload,
  }: {
    handleClickByDonwload: () => Promise<void>;
  }) => {
    const { messages, count } = useGetMessages();
    const styles = useStyles();
    const getAuthor = useGetAuthor();
    const activeUser = useActiveUser();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      ref.current.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, []);

    return (
      <div className={styles.messagesWrapper}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleClickByDonwload}
          hasMore={messages.length < count}
          loader={
            <>
              {messages.length < count && (
                <div className="loader" key={0}>
                  Loading ...
                </div>
              )}
            </>
          }
          useWindow={false}
          initialLoad={false}
          isReverse
        >
          <div ref={ref}>
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
        </InfiniteScroll>
      </div>
    );
  }
);

export default Messages;
