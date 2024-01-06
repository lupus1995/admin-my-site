import { AppDispatch } from "store/store";

import { clearStatus, setIsError, setIsLoading, setIsSuccess } from "./slice";
import { StatusActionI } from "./types";

export const handleIsLoading =
  ({ status, requestId }: StatusActionI) =>
  (dispatch: AppDispatch) => {
    dispatch(setIsLoading({ status, requestId }));
  };

export const handleIsError =
  ({ status, requestId }: StatusActionI) =>
  (dispatch: AppDispatch) => {
    dispatch(setIsError({ status, requestId }));
  };

export const handleIsSuccess =
  ({ status, requestId }: StatusActionI) =>
  (dispatch: AppDispatch) => {
    dispatch(setIsSuccess({ status, requestId }));
  };

export const handleClearStatus = () => (dispatch: AppDispatch) => {
  dispatch(clearStatus());
};
