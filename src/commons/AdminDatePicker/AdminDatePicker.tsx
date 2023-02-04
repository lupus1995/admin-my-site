import React, { FC, useState } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import {
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form/dist/types";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";

import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import useUtilsStyles from "utils/styles";

import { prepareDate } from "./helpers";

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
  const [startDate, setStartDate] = useState<Date>(
    prepareDate(defaultValue) || null
  );
  const utilsStyles = useUtilsStyles();
  const onChange = (value: Date) => {
    setStartDate(value);
    setValue(name, format(value, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    if (isSubmitted) trigger(name);
  };

  return (
    <>
      <FormRow>
        <FormLabel>{label}</FormLabel>
        <DatePicker
          name={name}
          className={classNames(`${utilsStyles.input}`, {
            [disabledClass]: isDisabled,
          })}
          selected={startDate}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
        />
        <TextError message={errors[name]?.message as string} />
      </FormRow>
    </>
  );
};

export default AdminDatePicker;
