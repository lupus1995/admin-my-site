import React, { FC } from "react";
import useStyles from "./style";

const TextError: FC<{ message: string | undefined }> = ({ message }) => {
  const styles = useStyles();

  return (
    <>
      {message && (
        <p className={styles.errorText} role="alert">
          {message}
        </p>
      )}
    </>
  );
};

export default TextError;
