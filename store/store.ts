import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { auth, authReducer, authMiddleware } from "./services/auth";
import { tokens, tokensReducer, tokensMiddleware } from "./services/tokens";

const rootReducer = combineReducers({
  [auth]: authReducer,
  [tokens]: tokensReducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDeafaultMeadlware) => {
      return getDeafaultMeadlware()
        .concat(authMiddleware)
        .concat(tokensMiddleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
