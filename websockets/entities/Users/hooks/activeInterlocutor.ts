import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { activeInterlocutorSelector, setActiveInterlocutor } from "../slice";
import { InterlocutorI } from "../types";

export const useGetActiveInterlocutor = () => {
  const activeInterlocutor = useAppSelector(
    activeInterlocutorSelector,
    shallowEqual
  );

  return { activeInterlocutor };
};

export const useSetActiveInterlocutor = () => {
  const dispatch = useAppDispatch();

  const handleSetActiveInterlocutor = useCallback(
    ({ interlocutor }: { interlocutor: InterlocutorI }) => {
      dispatch(setActiveInterlocutor(interlocutor));
    },
    [dispatch]
  );

  return { handleSetActiveInterlocutor };
};
