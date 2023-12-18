export {
  useGetInterlocutors,
  usePaginationInterlocutor,
  useSetSearch,
  useGetSearch,
  useGetActiveInterlocutor,
  useSetActiveInterlocutor,
  useActiveUser,
  useFetchActiveUser,
  useUpdateInterlocutor,
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
  searchSliceReducer,
  activeInterlocutorReducer,
  userSliceReducer,
};

export type { UserI, InterlocutorI };
