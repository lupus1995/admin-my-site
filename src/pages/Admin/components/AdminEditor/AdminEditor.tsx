import React, { FC } from "react";

// eslint-disable-next-line import/named
import { get } from "lodash";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  return (
    <FormRow>
      <FormLabel>
        {label}, {language || i18n.language}
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
