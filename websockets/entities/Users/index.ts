import {
  useGetInterlocutors,
  usePaginationInterlocutor,
  useSetSearch,
  useGetSearch,
  useGetActiveInterlocutor,
  useSetActiveInterlocutor,
  useActiveUser,
  useFetchActiveUser,
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
  userSliceReducer,
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
  userSliceReducer,
  useActiveUser,
  useFetchActiveUser,
};

export type { UserI, InterlocutorI };
