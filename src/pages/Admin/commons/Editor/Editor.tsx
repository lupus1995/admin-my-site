import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor as EditorDraft } from "react-draft-wysiwyg";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import { useTranslation } from "react-i18next";

import { usePrevious } from "utils/hooks";
import useStylesUtil from "utils/styles";

const Editor: FC<{
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isSubmitted: boolean;
  isDisabled: boolean;
  disabledClass: string;
  name: string;
}> = ({
  setValue,
  isSubmitted,
  trigger,
  watch,
  isDisabled,
  disabledClass,
  name,
  register,
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
    <>
      {isInitState && (
        <EditorDraft
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
    </>
  );
};

export default Editor;
