import {
  useGetInterlocutors,
  usePaginationInterlocutor,
  useSetSearch,
  useGetSearch,
} from "./hooks";
import {
  getInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
  searchInterlocutors,
} from "./services";
import { interlocutorReducer, searchSliceReducer } from "./slice";
import { PaginationI, UserI, InterlocutorI } from "./types";

export {
  searchInterlocutors,
  getInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
  interlocutorReducer,
  useGetInterlocutors,
  usePaginationInterlocutor,
  searchSliceReducer,
  useSetSearch,
  useGetSearch,
};

export type { PaginationI, UserI, InterlocutorI };
