import {
  useGetInterlocutors,
  usePaginationInterlocutor,
  useSetSearch,
  useGetSearch,
  useGetActiveInterlocutor,
  useSetActiveInterlocutor,
} from "./hooks";
import {
  getInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
  searchInterlocutors,
} from "./services";
import {
  interlocutorReducer,
  searchSliceReducer,
  activeInterlocutorReducer,
} from "./slice";
import { UserI, InterlocutorI } from "./types";

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
  activeInterlocutorReducer,
  useGetActiveInterlocutor,
  useSetActiveInterlocutor,
};

export type { UserI, InterlocutorI };
