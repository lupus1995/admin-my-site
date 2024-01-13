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

import { EditorProps } from "pages/Admin/commons/Editor";
import { useLanguage } from "utils/hooks";

import { useStyles } from "./style";
import { FormLabel, FormRow, TextError, Editor } from "../../commons";

const AdminEditor: FC<
  EditorProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: string;
      }>
    >;
    label: string;
    language: string;
  }
> = ({
  setValue,
  isSubmitted,
  trigger,
  watch,
  isDisabled,
  disabledClass,
  name,
  register,
  heightContainer,

  errors,
  label,
  language,
}) => {
  const { language: i18nLanguage } = useLanguage();
  const style = useStyles();

  return (
    <FormRow classname={`${style.marginAfterEditor}`}>
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
        heightContainer={heightContainer}
      />

      <TextError message={get(errors, name)?.message as string} />
    </FormRow>
  );
};

export default AdminEditor;
