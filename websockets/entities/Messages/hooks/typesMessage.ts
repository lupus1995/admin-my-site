import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchTypesMessage } from "../ducks";
import { typesMessageSelector } from "../slice";

export const useGetTypesMessage = () => {
  const typesMessage = useAppSelector(typesMessageSelector);

  return typesMessage;
};

export const useFetchTypesMessage = () => {
  const dispatch = useAppDispatch();

  const handleFetchTypesMessage = useCallback(
    () => dispatch(fetchTypesMessage()),
    [dispatch]
  );

  useEffect(() => {
    handleFetchTypesMessage();
  }, [handleFetchTypesMessage]);
};
