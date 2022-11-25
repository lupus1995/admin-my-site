import React, { FC, useEffect, useState } from "react";

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

const HomeEditor: FC<{
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
}> = ({ setValue, errors, isSubmitted, trigger, watch }) => {
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
    setValue("aboutMeDescription", htmlPuri);
    if (isSubmitted) trigger("aboutMeDescription");
  };

  useEffect(() => {
    if (!isInitState) {
      if (watch("aboutMeDescription")) {
        const contentBlock = htmlToDraft(watch("aboutMeDescription"));

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
  }, [isInitState, watch]);

  return (
    <FormRow>
      <FormLabel>Описание блока обо мне</FormLabel>
      {isInitState && (
        <Editor
          editorClassName={`${stylesUtils.input} ${stylesUtils.editor}`}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            image: {
              previewImage: true,
              uploadCallback,
            },
          }}
          defaultContentState={initState}
        />
      )}
      <TextError message={errors.aboutMeDescription?.message as string} />
    </FormRow>
  );
};

export default HomeEditor;
