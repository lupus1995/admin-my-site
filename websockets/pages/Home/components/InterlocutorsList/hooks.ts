import { useMemo } from "react";

import {
  InterlocutorI,
  useGetInterlocutors,
  useGetUsersOnline,
} from "websockets/entities/Users";

import { isUserOnline } from "./helpers";
import useStyles from "./styles";

export const useListInterlocutors = ({
  handleClickByInterlocutor,
}: {
  handleClickByInterlocutor: ({
    roomId,
    interlocutor,
  }: {
    roomId: string;
    interlocutor: InterlocutorI;
  }) => () => Promise<void>;
}) => {
  const interlocutors = useGetInterlocutors();
  const usersOnline = useGetUsersOnline();
  const usersOnlineIds = usersOnline.map((item) => item._id);
  const styles = useStyles();

  const list = useMemo(() => {
    return interlocutors.map((item) => ({
      ...item,
      styles,
      handleClickByInterlocutor,
      isOnline: isUserOnline({
        usersOnlineIds,
        interlocutor: item.interlocutor,
      }),
    }));
  }, [handleClickByInterlocutor, interlocutors, styles, usersOnlineIds]);

  return list;
};
