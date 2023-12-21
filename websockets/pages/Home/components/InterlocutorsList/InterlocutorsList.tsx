import React, { FC, useRef } from "react";

import classNames from "classnames";
import { DataView } from "primereact/dataview";

import { useSession } from "pages/Admin/hooks";
import {
  InterlocutorI,
  useGetInterlocutors,
  useGetUsersOnline,
  usePaginationInterlocutor,
} from "websockets/entities/Users";

import { Footer, Template, Header } from "./components";
import { useListInterlocutors } from "./hooks";
import useStyles from "./styles";

const InterlocutorsList: FC<{
  handleClickByInterlocutor: ({
    roomId,
    interlocutor,
  }: {
    roomId: string;
    interlocutor: InterlocutorI;
  }) => () => Promise<void>;
}> = ({ handleClickByInterlocutor }) => {
  const styles = useStyles();
  const { handlePagination, isLoading, handleInitPagination } =
    usePaginationInterlocutor();

  useSession();
  const ds = useRef(null);
  const list = useListInterlocutors({
    handleClickByInterlocutor,
  });

  if (isLoading && list.length === 0) {
    return null;
  }

  return (
    <div className={classNames(`${styles.interlocutorsList}`)}>
      <DataView
        ref={ds}
        value={list}
        itemTemplate={Template}
        rows={list.length}
        footer={<Footer handlePagination={handlePagination} />}
        header={<Header handleInitPagination={handleInitPagination} />}
      />
    </div>
  );
};

export default InterlocutorsList;
