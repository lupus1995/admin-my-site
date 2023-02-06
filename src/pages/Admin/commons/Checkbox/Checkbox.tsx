import React, { FC } from "react";

import classNames from "classnames";
// @ts-ignore
import CustomCheckbox from "react-custom-checkbox";
import { FieldValues, UseFormSetValue } from "react-hook-form/dist/types";

const Checkbox: FC<{
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  disabledClass: string;
  isDisabled: boolean;
  value: boolean;
  label: string;
}> = ({ name, setValue, disabledClass, isDisabled, value, label }) => {
  const handleChange = (newValue: boolean) => {
    setValue(name, newValue);
  };

  return (
    <CustomCheckbox
      className={classNames({
        [disabledClass]: isDisabled,
      })}
      disabled={isDisabled}
      checked={value}
      borderWidth={1}
      borderRadius={0}
      size={24}
      borderColor="#696cff"
      label={label}
      icon={
        <svg
          style={{ position: "relative", left: "-1px" }}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            fill="#696cff"
            d="M24 24h-24v-24h24v24zm-1-23h-22v22h22v-22zm-3 6.435l-10.005 10.565-4.995-5.866.761-.648 4.271 5.015 9.24-9.751.728.685z"
          />
        </svg>
      }
      onChange={handleChange}
    />
  );
};

export default Checkbox;
