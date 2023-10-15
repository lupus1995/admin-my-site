import React from "react";

import classNames from "classnames";
import { InputText } from "primereact/inputtext";

import useStyles from "./styles";

const Header = () => {
  const styles = useStyles();
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
        onChange={(e) => console.log(e.target.value)}
      />
      <label htmlFor="username">Username</label>
    </span>
  );
};

export default Header;
