import { useMemo } from "react";

import { UserI } from "websockets/entities/Users";

import useStyles from "./styles";

export const useListInterlocutors = (interlocutors: UserI[]) => {
  const styles = useStyles();

  const list = useMemo(() => {
    return interlocutors.map((item) => ({
      ...item,
      styles,
    }));
  }, [interlocutors, styles]);

  return list;
};
