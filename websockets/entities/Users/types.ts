export interface PaginationI {
  limit: number;
  offset: number;
}

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

enum TYPE_MESSAGE {
  // текстовое сообщение
  TEXT = "TEXT",
  // изображение
  IMAGE = "IMAGE",
  // текстовое сообщение + изображение
  TEXT_AND_IMAGE = "TEXT_AND_IMAGE",
  // аудио сообщение
  AUDIO = "AUDIO",
}

export interface MessageI {
  _id: string;
  from: string;
  to: string;
  typeMessage: TYPE_MESSAGE;
  isArchive: boolean;
  value: string;
  linkToImage: string | null;
  linkToAudio: string | null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface UserI {
  interlocutor: InterlocutorI;
  message: MessageI;
  id: number;
}
