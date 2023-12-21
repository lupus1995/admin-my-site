import React, { memo } from "react";

import classNames from "classnames";

import { useFetchActiveUser } from "websockets/entities/Users";

import { InterlocutorsList, ListMessages } from "./components";
import { useClickByInterlocutor } from "./hooks";
import useStyles from "./styles";
import { SocketsWrapper } from "./wrappers";

const Home = memo(() => {
  const styles = useStyles();
  const { handleClickByDonwload, handleClickByInterlocutor } =
    useClickByInterlocutor();
  useFetchActiveUser();
  return (
    <SocketsWrapper>
      <div className={classNames(`${styles.chatWrapper}`)}>
        <InterlocutorsList
          handleClickByInterlocutor={handleClickByInterlocutor}
        />
        <ListMessages />
      </div>
    </SocketsWrapper>
  );
});

export default Home;
