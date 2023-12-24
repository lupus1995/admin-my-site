import { useEffect } from "react";

import { useAppSelector } from "store/hooks";
import { RootState } from "store/store";

import { requestSelector } from "./slice";
import { StatusI } from "./types";

export const useRequest = ({
  statusSelector = requestSelector,
  runCondition,
  requestFn,
  successFn,
  errorFn,
}: {
  statusSelector: (state: RootState) => StatusI;
  runCondition: boolean;
  requestFn: () => void;
  successFn?: () => void;
  errorFn?: () => void;
}) => {
  const { isLoading, isError, isSuccess } = useAppSelector(statusSelector);

  useEffect(() => {
    if (!isLoading && runCondition && !isError && !isSuccess) {
      requestFn();
    }
  }, [isError, isLoading, isSuccess, requestFn, runCondition]);

  useEffect(() => {
    if (isSuccess) successFn();
  }, [isSuccess, successFn]);

  useEffect(() => {
    if (isSuccess) successFn();
  }, [isSuccess, successFn]);

  useEffect(() => {
    if (isError) errorFn();
  }, [errorFn, isError]);
};
