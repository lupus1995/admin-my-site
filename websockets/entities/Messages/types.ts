import { MessageI } from "../share/types";

export interface RoomIdI {
  roomId: string;
}

export type TYPE_MESSAGE = {
  // текстовое сообщение
  TEXT: "TEXT";
  // изображение
  IMAGE: "IMAGE";
  // текстовое сообщение + изображение
  TEXT_AND_IMAGE: "TEXT_AND_IMAGE";
  // аудио сообщение
  AUDIO: "AUDIO";
};

type MESSAGE =
  | TYPE_MESSAGE["TEXT"]
  | TYPE_MESSAGE["IMAGE"]
  | TYPE_MESSAGE["TEXT_AND_IMAGE"]
  | TYPE_MESSAGE["AUDIO"];

export interface CreateMessageI {
  from: string;
  to: string;
  typeMessage: MESSAGE;
  value: string;
  createdAt: string;
  updatedAt: string;
  roomId: string;
}

export interface ResponseMessagesI {
  messages: MessageI[];
  count: number;
}

export interface ResponseMessageI {
  message: MessageI;
  count: number;
}
