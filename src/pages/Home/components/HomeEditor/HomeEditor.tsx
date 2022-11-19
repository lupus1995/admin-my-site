import React, { FC, useEffect } from "react";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
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
}> = ({ setValue, errors, register, isSubmitted, trigger }) => {
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
    register("aboutMeDescription", { required: "Поле обязательно" });
  }, [register]);

  return (
    <FormRow>
      <FormLabel>Описание блока обо мне</FormLabel>
      <Editor
        editorClassName={`${stylesUtils.input} ${stylesUtils.editor}`}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          image: {
            previewImage: true,
            uploadCallback,
          },
        }}
        // defaultContentState={{ ...defaultEditorState }}
      />
      <TextError message={errors.aboutMeDescription?.message as string} />
    </FormRow>
  );
};

export default HomeEditor;
