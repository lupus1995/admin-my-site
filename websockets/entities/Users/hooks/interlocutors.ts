import { useState, useEffect, useCallback, useMemo } from "react";

import { shallowEqual } from "react-redux";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { PaginationI } from "websockets/entities/share/types";

import { useGetSearch } from "./search";
import { fetchInterlocutors, fetchSearchInterlocutor } from "../ducks";
import {
  clearInterlocutors,
  interlocutorSelector,
  updateInterlocutors,
} from "../slice";
import { UserI } from "../types";

export const useUpdateInterlocutor = () => {
  const dispatch = useAppDispatch();

  // const handleUpdateInterlocutor = useCallback(
  //   (roomId: string) => {
  //     dispatch(fetchInterlocutor(roomId));
  //   },
  //   [dispatch]
  // );

  const handleUpdateInterlocutor = useCallback(
    (interlocutor: UserI) => {
      dispatch(updateInterlocutors(interlocutor));
    },
    [dispatch]
  );

  return { handleUpdateInterlocutor };
};

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
