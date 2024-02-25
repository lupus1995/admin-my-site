import React, { FC } from "react";

import { Button } from "primereact/button";

export const FooterModalRTC: FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  return (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={handleClose}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={handleClose} autoFocus />
    </>
  );
};
