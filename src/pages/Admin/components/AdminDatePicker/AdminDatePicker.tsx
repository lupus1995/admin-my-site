import React, { FC } from "react";

import {
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  FieldErrorsImpl,
} from "react-hook-form";

import { Date, FormRow, TextError, FormLabel } from "../../commons";

const AdminDatePicker: FC<{
  setValue: UseFormSetValue<FieldValues>;
  disabledClass: string;
  isDisabled: boolean;
  defaultValue: string;
  name: string;
  label: string;
  trigger: UseFormTrigger<FieldValues>;
  isSubmitted: boolean;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
}> = ({
  disabledClass,
  isDisabled,
  name,
  errors,
  label,
  setValue,
  defaultValue,
  trigger,
  isSubmitted,
}) => {
  return (
    <>
      <FormRow>
        <FormLabel>{label}</FormLabel>
        <Date
          disabledClass={disabledClass}
          isDisabled={isDisabled}
          defaultValue={defaultValue}
          name={name}
          trigger={trigger}
          isSubmitted={isSubmitted}
          setValue={setValue}
        />
        <TextError message={errors[name]?.message as string} />
      </FormRow>
    </>
  );
};

export default AdminDatePicker;
