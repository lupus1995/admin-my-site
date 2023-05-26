import React, { FC } from "react";

import { AdminCheckbox } from "pages/Admin/components";

import { useDisableHidePublished } from "./hooks";
import { HidePublishedPropsI } from "./interfaces";

const HidePublished: FC<HidePublishedPropsI> = ({
  watch,
  isInitForm,
  disabledClass,
  setValue,
  isDisabled,
  name,
  label,
  publishedAtValue,
}) => {
  const disabledCheckbox = useDisableHidePublished({
    isInitForm,
    publishedAtValue,
    isDisabled,
  });

  return (
    <AdminCheckbox
      isDisabled={disabledCheckbox}
      disabledClass={disabledCheckbox ? disabledClass : ""}
      name={name}
      setValue={setValue}
      value={watch(name)}
      label={label}
    />
  );
};

export default HidePublished;
