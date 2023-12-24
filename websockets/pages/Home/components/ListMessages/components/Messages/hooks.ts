import { useCallback } from "react";

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
