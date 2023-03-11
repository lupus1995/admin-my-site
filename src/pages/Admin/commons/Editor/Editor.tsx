import React, { FC, useEffect, useState } from "react";

import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import { useTranslation } from "react-i18next";

import { hasWindow } from "utils/helpers";
import { usePrevious } from "utils/hooks";

import EditorContainer from "./EditorContainer";

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
      import("html-to-draftjs").then((htmlToDraft) => {
        const contentBlock = htmlToDraft.default(watch(name) || "");

        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = convertToRaw(contentState);
          setInitState(editorState);
        }
      });

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
        <EditorContainer
          initState={initState}
          disabledClass={disabledClass}
          isDisabled={isDisabled}
          handleEditorChange={handleEditorChange}
          uploadCallback={uploadCallback}
        />
      )}
    </>
  );
};

export default Editor;
