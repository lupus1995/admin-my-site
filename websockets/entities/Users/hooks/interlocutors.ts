import { useState, useEffect, useCallback, useMemo } from "react";

import { shallowEqual } from "react-redux";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { useGetSearch } from "./search";
import { fetchInterlocutors, fetchSearchInterlocutor } from "../ducks";
import { clearInterlocutors, interlocutorSelector } from "../slice";
import { PaginationI } from "../types";

export const useGetInterlocutors = () => {
  const interlocutors = useAppSelector(interlocutorSelector, shallowEqual);

  return interlocutors;
};

export const usePaginationInterlocutor = () => {
  const search = useGetSearch();
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<
    PaginationI & { isLoading: boolean }
  >({
    limit: 10,
    offset: 0,
    isLoading: true,
  });

  const request = useMemo(() => {
    return search ? fetchSearchInterlocutor : fetchInterlocutors;
  }, [search]);

  useEffect(() => {
    if (pagination.isLoading) {
      dispatch(request(pagination));
      setPagination({
        ...pagination,
        isLoading: false,
      });
    }
  }, [dispatch, pagination, request, setPagination]);

  const handleInitPagination = useCallback(() => {
    dispatch(clearInterlocutors());
    setPagination({
      ...pagination,
      offset: 0,
      isLoading: true,
    });
  }, [dispatch, pagination]);

  const handlePagination = useCallback(() => {
    setPagination({
      ...pagination,
      offset: pagination.offset + 1,
      isLoading: true,
    });
  }, [pagination, setPagination]);

  return {
    handlePagination,
    isLoading: pagination.isLoading,
    handleInitPagination,
  };
};
