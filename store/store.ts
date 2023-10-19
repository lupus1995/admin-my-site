import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { auth, authReducer, authMiddleware } from "./services/auth";
import { tokens, tokensReducer, tokensMiddleware } from "./services/tokens";
import {
  authMiddleware as authWebsocketsMiddleware,
  auth as authWebsocket,
  authReducer as authWebscoketsReducer,
} from "../websockets/entities/Auth";
import {
  usersMiddleware,
  users,
  usersReducer,
  interlocutorReducer,
  searchSliceReducer,
} from "../websockets/entities/Users";

export const rootReducer = combineReducers({
  [auth]: authReducer,
  [tokens]: tokensReducer,
  [authWebsocket]: authWebscoketsReducer,
  [users]: usersReducer,
  websockets: combineReducers({
    interlocutor: interlocutorReducer,
    searchSlice: searchSliceReducer,
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
        usersMiddleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
