import React from "react";

import classNames from "classnames";

import { InterlocutorsList, ListMessages } from "./components";
import { useClickByInterlocutor } from "./hooks";
import useStyles from "./styles";

const Home = () => {
  const styles = useStyles();
  const { handleClickByDonwload, handleClickByInterlocutor } =
    useClickByInterlocutor();
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
