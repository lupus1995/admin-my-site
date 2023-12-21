import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { auth, authReducer, authMiddleware } from "./services/auth";
import { tokens, tokensReducer, tokensMiddleware } from "./services/tokens";
import {
  authMiddleware as authWebsocketsMiddleware,
  auth as authWebsocket,
  authReducer as authWebscoketsReducer,
} from "../websockets/entities/Auth";
import {
  messagesApiReducer,
  messagesMidlware,
  messages,
  messagesReducer,
  typesMessageReducer,
  roomReducer,
} from "../websockets/entities/Messages";
import {
  usersMiddleware,
  users,
  usersReducer,
  interlocutorReducer,
  searchSliceReducer,
  activeInterlocutorReducer,
  userSliceReducer,
  usersOnlineSliceReducer,
} from "../websockets/entities/Users";

export const rootReducer = combineReducers({
  [auth]: authReducer,
  [tokens]: tokensReducer,
  [authWebsocket]: authWebscoketsReducer,
  [users]: usersReducer,
  [messages]: messagesApiReducer,
  websockets: combineReducers({
    interlocutor: interlocutorReducer,
    searchSlice: searchSliceReducer,
    activeInterlocutor: activeInterlocutorReducer,
    messages: messagesReducer,
    user: userSliceReducer,
    typesMessage: typesMessageReducer,
    roomId: roomReducer,
    usersOnline: usersOnlineSliceReducer,
  }),
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDeafaultMeadlware) => {
      return getDeafaultMeadlware().concat(
        authMiddleware,
        tokensMiddleware,
        authWebsocketsMiddleware,
        usersMiddleware,
        messagesMidlware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
