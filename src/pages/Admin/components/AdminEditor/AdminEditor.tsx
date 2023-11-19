import React, { FC } from "react";

// eslint-disable-next-line import/named
import { get } from "lodash";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
  FieldErrorsImpl,
  FieldValues,
} from "react-hook-form";

import { useLanguage } from "utils/hooks";

import { FormLabel, FormRow, TextError, Editor } from "../../commons";

const AdminEditor: FC<{
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isSubmitted: boolean;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
  isDisabled: boolean;
  disabledClass: string;
  name: string;
  label: string;
  language: string;
}> = ({
  setValue,
  errors,
  isSubmitted,
  trigger,
  watch,
  isDisabled,
  disabledClass,
  name,
  label,
  register,
  language,
}) => {
  const { language: i18nLanguage } = useLanguage();

  return (
    <FormRow>
      <FormLabel>
        {label}, {language || i18nLanguage}
      </FormLabel>
      <Editor
        setValue={setValue}
        register={register}
        trigger={trigger}
        watch={watch}
        isSubmitted={isSubmitted}
        isDisabled={isDisabled}
        disabledClass={disabledClass}
        name={name}
      />

      <TextError message={get(errors, name)?.message as string} />
    </FormRow>
  );
};

export default AdminEditor;
