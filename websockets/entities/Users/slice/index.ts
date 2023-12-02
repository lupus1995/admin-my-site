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
};
