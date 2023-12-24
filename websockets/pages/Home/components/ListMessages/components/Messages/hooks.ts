import { useCallback, useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "store/hooks";
import { usePrevious } from "utils/hooks";
import { useGetRoomId } from "websockets/entities/Messages";
import { requestSelector } from "websockets/entities/share/services/StatusRequest";
import { MessageI } from "websockets/entities/share/types";
import {
  useActiveUser,
  useGetActiveInterlocutor,
} from "websockets/entities/Users";
import { generateFullName } from "websockets/pages/Home/helpers";

export const useGetAuthor = () => {
  const activeUser = useActiveUser();
  const { activeInterlocutor } = useGetActiveInterlocutor();

  const handleIsAuthor = useCallback(
    ({ from }: { from: string }) => {
      let author = activeInterlocutor;
      if (from === activeUser._id) {
        author = activeUser;
      }

      return generateFullName({ interlocutor: author });
    },
    [activeInterlocutor, activeUser]
  );

  return handleIsAuthor;
};

export const useScrollToLastChildAfterFirstRender = ({
  messages,
}: {
  messages: MessageI[];
}) => {
  const isFirstRender = useRef(false);
  const { ref: refObserver, entry } = useInView({ threshold: 0 });
  const activeRoomId = useGetRoomId();
  const prevActiveRoom = usePrevious<string>(activeRoomId);

  useEffect(() => {
    if (
      messages.length > 0 &&
      (prevActiveRoom !== activeRoomId || !isFirstRender.current) &&
      entry?.target.lastElementChild
    ) {
      entry.target.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      isFirstRender.current = true;
    }
  }, [activeRoomId, entry, messages, prevActiveRoom]);

  return { refObserver, entry };
};

export const useLoadMessagesByScroll = () => {
  const {
    ref: refFirstElement,
    inView: inViewElement,
    entry,
  } = useInView({
    threshold: 1.0,
  });

  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if (inViewElement && !isLoading) {
      console.log('inViewElement', inViewElement);
      setIsLoading(true);
    }
  }, [inViewElement, isLoading]);

  return {
    refFirstElement,
  };
};
