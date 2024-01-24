import React, { FC, useEffect, useState } from "react";

import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

import { useLanguage, usePrevious } from "utils/hooks";

import EditorContainer from "./EditorContainer";
import { EditorProps } from "../../types";

const Wysiwyg: FC<EditorProps> = ({
  setValue,
  isSubmitted,
  trigger,
  watch,
  isDisabled,
  disabledClass,
  name,
  register,
}) => {
  const { t, language } = useLanguage();
  const prevLng = usePrevious(language);

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
      import("html-to-draftjs")
        .then((htmlToDraft) => {
          const contentBlock = htmlToDraft.default(watch(name) || "");

          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            const editorState = convertToRaw(contentState);
            setInitState(editorState);
          }
        })
        .finally(() => {
          setIsInitState(!isInitState);
        });
    }
  }, [isInitState, name, watch]);

  useEffect(() => {
    if (prevLng !== language) {
      register(name, { required: t("requiredText") });
    }
  }, [language, name, prevLng, register, t]);

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

export default Wysiwyg;
