import React, { FC } from "react";

import classNames from "classnames";
import { InputText } from "primereact/inputtext";

import { useGetSearch } from "websockets/entities/Users";

import { useHandleSearchValue } from "./hooks";
import useStyles from "./styles";

const Header: FC<{ handleInitPagination: () => void }> = ({
  handleInitPagination,
}) => {
  const search = useGetSearch();
  const { handleClick } = useHandleSearchValue();
  const styles = useStyles();
  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      e.preventDefault();
      handleInitPagination();
    }
  };

  return (
    <span
      className={classNames(
        `p-float-label p-input-icon-left ${styles.inputWrapper}`
      )}
    >
      <i className="pi pi-search" />
      <InputText
        className={styles.input}
        id="username"
        value={search}
        onChange={handleClick}
        onKeyPress={handlePress}
      />
      <label htmlFor="username">Username</label>
    </span>
  );
};

export default Header;
