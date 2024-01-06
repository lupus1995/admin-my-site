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
  useGetUsersOnline,
  useSetUsersOnline,
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
  usersOnlineSliceReducer,
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
  usersOnlineSliceReducer,
};

export type { UserI, InterlocutorI };
