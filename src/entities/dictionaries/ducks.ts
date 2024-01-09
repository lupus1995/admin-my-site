import { AppDispatch } from "store/store";

import { getTypeTextEditor } from "./service";

export const fetchTypeTextEditor = () => async (dispatch: AppDispatch) => {
  const data = await dispatch(getTypeTextEditor.initiate());

  console.log(data);
};
