import React from "react";

import classNames from "classnames";

import { useFetchActiveUser } from "websockets/entities/Users";

import { InterlocutorsList, ListMessages } from "./components";
import { useClickByInterlocutor } from "./hooks";
import useStyles from "./styles";

const Home = () => {
  const styles = useStyles();
  const { handleClickByDonwload, handleClickByInterlocutor } =
    useClickByInterlocutor();
  useFetchActiveUser();
  return (
    <div className={classNames(`${styles.chatWrapper}`)}>
      <InterlocutorsList
        handleClickByInterlocutor={handleClickByInterlocutor}
      />
      <ListMessages />
    </div>
  );
};

export default Home;
