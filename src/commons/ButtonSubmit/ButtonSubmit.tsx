import React from "react";

import useStyles from "./style";

const ButtonSubmit = () => {
  const styles = useStyles();

  return (
    <button className={styles.buttonSubmit} type="submit">
      Отправить
    </button>
  );
};

export default ButtonSubmit;
