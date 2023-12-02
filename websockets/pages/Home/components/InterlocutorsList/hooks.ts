import { useMemo } from "react";

import { InterlocutorI, UserI } from "websockets/entities/Users";

import useStyles from "./styles";

export const useListInterlocutors = ({
  interlocutors,
  handleClickByInterlocutor,
}: {
  interlocutors: UserI[];
  handleClickByInterlocutor: ({
    roomId,
    interlocutor,
  }: {
    roomId: string;
    interlocutor: InterlocutorI;
  }) => () => Promise<void>;
}) => {
  const styles = useStyles();

  const list = useMemo(() => {
    return interlocutors.map((item) => ({
      ...item,
      styles,
      handleClickByInterlocutor,
    }));
  }, [handleClickByInterlocutor, interlocutors, styles]);

  return list;
};
