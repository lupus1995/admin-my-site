import React, { FC } from "react";

import { FieldValues, UseFormSetValue } from "react-hook-form/dist/types";

import { Checkbox, FormRow } from "pages/Admin/commons";

const AdminCheckbox: FC<{
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  disabledClass: string;
  isDisabled: boolean;
  value: boolean;
  label: string;
}> = (props) => {
  return (
    <FormRow>
      <Checkbox {...props} />
    </FormRow>
  );
};

export default AdminCheckbox;
