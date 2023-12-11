import activeInterlocutorReducer, {
  setActiveInterlocutor,
  activeInterlocutorSelector,
} from "./activeInterlocutorSlice";
import interlocutorReducer, {
  interlocutorSelector,
  addInterlocutors,
  clearInterlocutors,
} from "./intelocutorSlice";
import searchSliceReducer, {
  searchSelector,
  setTypedSearch,
} from "./searchSlice";
import userSliceReducer, { userSelector, setUser } from "./userSlice";

export {
  interlocutorReducer,
  searchSliceReducer,
  interlocutorSelector,
  searchSelector,
  setTypedSearch,
  addInterlocutors,
  clearInterlocutors,
  activeInterlocutorReducer,
  setActiveInterlocutor,
  activeInterlocutorSelector,
  userSliceReducer,
  userSelector,
  setUser,
};
