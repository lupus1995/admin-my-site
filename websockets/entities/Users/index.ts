import { usePaginationInterlocutor } from "./hooks";
import {
  getInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
} from "./services";
import interlocutorReducer from "./slice";
import { PaginationI, UserI, InterlocutorI } from "./types";

export {
  getInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
  interlocutorReducer,
  usePaginationInterlocutor,
};

export type { PaginationI, UserI, InterlocutorI };
