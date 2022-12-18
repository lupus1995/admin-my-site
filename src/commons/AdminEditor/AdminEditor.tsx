import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";

import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
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
}) => {
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

  return (
    <FormRow>
      <FormLabel>{label}</FormLabel>
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
      <TextError message={errors[name]?.message as string} />
    </FormRow>
  );
};

export default AdminEditor;