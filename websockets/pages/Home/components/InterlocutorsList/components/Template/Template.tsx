import React, { FC } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import { Classes } from "jss";
import { Avatar } from "primereact/avatar";
import LinesEllipsis from "react-lines-ellipsis";

import { UserI } from "websockets/entities/Users";

import { generateFullName } from "./helpers";

const Template: FC<
  UserI & {
    styles: Classes<
      | "interlocutorItem"
      | "interlocutorAvatar"
      | "interlocutorsDate"
      | "interlocutorInfo"
      | "interlocutorButton"
    >;
  }
> = ({ interlocutor, message, styles }) => {
  return (
    <button
      type="button"
      className={classNames(`${styles.interlocutorButton}`)}
    >
      <div className={classNames(`${styles.interlocutorItem}`)}>
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
            <time>
              {format(new Date(message.createdAt), "HH:mm:ss dd.MM.yyyy")}
            </time>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Template;
