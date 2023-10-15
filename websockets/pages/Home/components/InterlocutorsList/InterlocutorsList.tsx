import React, { memo, useRef } from "react";

import classNames from "classnames";
import { DataView } from "primereact/dataview";

import { useSession } from "pages/Admin/hooks";
import { usePaginationInterlocutor } from "websockets/entities/Users";

import { Footer, Template, Header } from "./components";
import { useListInterlocutors } from "./hooks";
import useStyles from "./styles";

const InterlocutorsList = memo(() => {
  const styles = useStyles();
  const { handlePagination, interlocutors, isLoading } =
    usePaginationInterlocutor();
  useSession();
  const ds = useRef(null);
  const list = useListInterlocutors(interlocutors);

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
        header={<Header />}
      />
    </div>
  );
});

export default InterlocutorsList;
