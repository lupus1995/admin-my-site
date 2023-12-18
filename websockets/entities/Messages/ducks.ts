import { AppDispatch } from "store/store";

import { createMessage, getMessages, getTypesMessage } from "./services";
import { addMessages, setTypesMessage } from "./slice";
import { CreateMessageI, RoomIdI } from "./types";
import { isMessage } from "../share/helpers";
import { MessageI, PaginationI } from "../share/types";

// получить сообщения для списка
export const fetchGetMessages =
  ({ limit, offset, roomId }: PaginationI & RoomIdI) =>
  async (dispatch: AppDispatch) => {
    const { data } = await dispatch(
      getMessages.initiate({ limit, offset, roomId })
    );

    dispatch(addMessages(data));
  };

// получить типы сообщений
export const fetchTypesMessage = () => async (dispatch: AppDispatch) => {
  const { data } = await dispatch(getTypesMessage.initiate());

  dispatch(setTypesMessage(data));
};

// создать сообщение, которое создал пользователь
export const fetchCreateMessage =
  ({ message }: { message: CreateMessageI }) =>
  async (dispatch: AppDispatch): Promise<MessageI | void> => {
    const result = await dispatch(createMessage.initiate(message));

    if (isMessage(result)) {
      dispatch(addMessages([result.data]));
    }

    new Error("Ошибка отправления сообщения");
  };
