import React, { FC } from "react";

import { Button } from "primereact/button";

const Footer: FC<{
  handlePagination: () => void;
}> = ({ handlePagination }) => {
  return (
    <Button
      type="button"
      icon="pi pi-plus"
      label="Загрузить еще"
      onClick={handlePagination}
    />
  );
};

export default Footer;
