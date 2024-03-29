import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  reducer as ArticlesReducer,
  reducerPath as articlesReducerPath,
  middleware as ArticlesMiddleware,
} from "entities/articles";
import { RequestReducer } from "websockets/entities/share/services/StatusRequest";

import { auth, authReducer, authMiddleware } from "./services/auth";
import { moduleReducer } from "./services/manageModules";
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
  peerToPeerName,
  peerToPeerReducer,
} from "../websockets/entities/Users";

export const rootReducer = combineReducers({
  [auth]: authReducer,
  [tokens]: tokensReducer,
  [authWebsocket]: authWebscoketsReducer,
  [users]: usersReducer,
  [messages]: messagesApiReducer,
  [articlesReducerPath]: ArticlesReducer,
  websockets: combineReducers({
    interlocutor: interlocutorReducer,
    searchSlice: searchSliceReducer,
    activeInterlocutor: activeInterlocutorReducer,
    messages: messagesReducer,
    user: userSliceReducer,
    typesMessage: typesMessageReducer,
    roomId: roomReducer,
    usersOnline: usersOnlineSliceReducer,
    request: RequestReducer,
    [peerToPeerName]: peerToPeerReducer,
  }),
  module: moduleReducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer: rootReducer,
    middleware: (getDeafaultMeadlware) => {
      return getDeafaultMeadlware().concat(
        authMiddleware,
        tokensMiddleware,
        authWebsocketsMiddleware,
        usersMiddleware,
        messagesMidlware,
        ArticlesMiddleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
