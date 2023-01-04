import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { get } from "lodash";
import { Editor } from "react-draft-wysiwyg";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import { useTranslation } from "react-i18next";

import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import { usePrevious } from "utils/hooks";
import useStylesUtil from "utils/styles";

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
  const { t, i18n } = useTranslation();
  const prevLng = usePrevious(i18n.language);

  const [isInitState, setIsInitState] = useState<boolean>(false);
  const [initState, setInitState] = useState(null);
  const stylesUtils = useStylesUtil();

  const uploadCallback = (file: File) => {
    return new Promise((resolve) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        resolve({ data: { link: reader.result } });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditorChange = (editorState: EditorState) => {
    const htmlPuri = draftToHtmlPuri(
      convertToRaw(editorState.getCurrentContent())
    );
    setValue(name, htmlPuri);
    if (isSubmitted) trigger(name);
  };

  // парсинг данных html в структуру данных для текстового редактора
  useEffect(() => {
    if (!isInitState) {
      if (watch(name)) {
        const contentBlock = htmlToDraft(watch(name));

        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = convertToRaw(contentState);
          setInitState(editorState);
        }
      }
      setIsInitState(!isInitState);
    }
  }, [isInitState, name, watch]);

  useEffect(() => {
    if (prevLng !== i18n.language) {
      register(name, { required: t("requiredText") });
    }
  }, [i18n.language, name, prevLng, register, t]);

  return (
    <FormRow>
      <FormLabel>
        {label}, {language}
      </FormLabel>
      {isInitState && (
        <Editor
          editorClassName={classNames(
            `${stylesUtils.input} ${stylesUtils.editor}`,
            {
              [disabledClass]: isDisabled,
            }
          )}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            image: {
              previewImage: true,
              uploadCallback,
            },
          }}
          readOnly={isDisabled}
          defaultContentState={initState}
        />
      )}
      <TextError message={get(errors, name)?.message as string} />
    </FormRow>
  );
};

export default AdminEditor;
