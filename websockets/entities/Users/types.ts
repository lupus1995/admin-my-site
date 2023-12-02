import { MessageI } from "../share/types";

export interface InterlocutorI {
  _id: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  listOfBlockedInterlocutors: [];
  listIOfDeletedDialogs: [];
  __v: 0;
}

export interface UserI {
  interlocutor: InterlocutorI;
  message: MessageI;
  id: number;
}
