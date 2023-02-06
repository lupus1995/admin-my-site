import React, { FC, useState } from "react";

import classNames from "classnames";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import {
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form/dist/types";

import useUtilsStyles from "utils/styles";

import { prepareDate } from "./helpers";

const Date: FC<{
  setValue: UseFormSetValue<FieldValues>;
  disabledClass: string;
  isDisabled: boolean;
  defaultValue: string;
  name: string;
  trigger: UseFormTrigger<FieldValues>;
  isSubmitted: boolean;
}> = ({
  disabledClass,
  isDisabled,
  name,
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
    <DatePicker
      name={name}
      className={classNames(`${utilsStyles.input}`, {
        [disabledClass]: isDisabled,
      })}
      selected={startDate}
      onChange={onChange}
      dateFormat="dd.MM.yyyy"
    />
  );
};

export default Date;
