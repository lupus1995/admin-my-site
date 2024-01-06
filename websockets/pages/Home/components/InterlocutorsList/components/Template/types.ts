import { Classes } from "jss";

import { InterlocutorI, UserI } from "websockets/entities/Users";

export type PropsT = Omit<UserI, "id"> & {
  isOnline: boolean;
  styles: Classes<
    | "interlocutorItem"
    | "interlocutorAvatar"
    | "interlocutorsDate"
    | "interlocutorInfo"
    | "interlocutorButton"
    | "interlocutorItemActive"
    | "interlocutorBadge"
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
