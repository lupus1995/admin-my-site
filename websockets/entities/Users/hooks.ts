import { useCallback, useEffect, useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

import { useAppDispatch } from "store/hooks";

import { fetchInterlocutors } from "./ducks";
import { interlocutorSelector } from "./slice";
import { PaginationI } from "./types";

export const usePaginationInterlocutor = () => {
  const dispatch = useAppDispatch();
  const interlocutors = useSelector(interlocutorSelector, shallowEqual);
  const [pagination, setPagination] = useState<
    PaginationI & { isLoading: boolean }
  >({
    limit: 10,
    offset: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (pagination.isLoading) {
      dispatch(fetchInterlocutors(pagination));
      setPagination({
        ...pagination,
        isLoading: false,
      });
    }
  }, [dispatch, pagination]);

  const handlePagination = useCallback(() => {
    setPagination({
      ...pagination,
      offset: pagination.offset + 1,
      isLoading: true,
    });
  }, [pagination]);

  return { interlocutors, handlePagination, isLoading: pagination.isLoading };
};
