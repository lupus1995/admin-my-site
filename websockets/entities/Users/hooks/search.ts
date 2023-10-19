import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { searchSelector, setTypedSearch } from "../slice";

export const useGetSearch = () => {
  const search = useAppSelector(searchSelector, shallowEqual);

  return search;
};

export const useSetSearch = () => {
  const dispatch = useAppDispatch();

  const handleSetSearch = useCallback(
    (value: string) => dispatch(setTypedSearch(value)),
    [dispatch]
  );

  return handleSetSearch;
};
