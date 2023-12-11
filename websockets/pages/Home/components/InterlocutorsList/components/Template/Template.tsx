import React, { FC } from "react";

import classNames from "classnames";
import { Avatar } from "primereact/avatar";
import LinesEllipsis from "react-lines-ellipsis";

import { Time } from "websockets/pages/Home/commons";
import { generateFullName } from "websockets/pages/Home/helpers";

import { useIsActiveInterlocutor } from "./hooks";
import { PropsT } from "./types";

const Template: FC<PropsT> = ({
  interlocutor,
  message,
  styles,
  handleClickByInterlocutor,
}) => {
  const isActive = useIsActiveInterlocutor({ interlocutor });

  return (
    <button
      type="button"
      className={classNames(`${styles.interlocutorButton}`)}
      onClick={handleClickByInterlocutor({
        roomId: message.roomId,
        interlocutor,
      })}
    >
      <div
        className={classNames(`${styles.interlocutorItem}`, {
          [styles.interlocutorItemActive]: isActive,
        })}
      >
        <div className={classNames(`${styles.interlocutorAvatar}`)}>
          <Avatar image={interlocutor.avatar} size="large" shape="circle" />
        </div>
        <div className={classNames(`${styles.interlocutorInfo}`)}>
          <LinesEllipsis
            text={generateFullName({ interlocutor })}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="words"
          />

          <LinesEllipsis
            text={message.value}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="words"
          />
          <div className={classNames(`${styles.interlocutorsDate}`)}>
            <Time date={message.createdAt} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Template;
