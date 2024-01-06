import React from "react";

import { useGetActiveInterlocutor } from "websockets/entities/Users";
import { generateFullName } from "websockets/pages/Home/helpers";

import useStyles from "./style";

const NameInterlocutor = () => {
  const styles = useStyles();
  const { activeInterlocutor } = useGetActiveInterlocutor();
  const fullName = generateFullName({ interlocutor: activeInterlocutor });

  return <div className={styles.nameWrapper}>{fullName}</div>;
};

export default NameInterlocutor;
