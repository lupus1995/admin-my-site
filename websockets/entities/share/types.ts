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
  roomId: string;
  __v: 0;
}

export interface PaginationI {
  limit: number;
  offset: number;
}
