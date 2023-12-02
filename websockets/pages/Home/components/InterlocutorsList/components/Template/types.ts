import { Classes } from "jss";

import { InterlocutorI, UserI } from "websockets/entities/Users";

export type PropsT = UserI & {
  styles: Classes<
    | "interlocutorItem"
    | "interlocutorAvatar"
    | "interlocutorsDate"
    | "interlocutorInfo"
    | "interlocutorButton"
  >;
} & {
  handleClickByInterlocutor: ({
    roomId,
    interlocutor,
  }: {
    roomId: string;
    interlocutor: InterlocutorI;
  }) => () => Promise<void>;
};
