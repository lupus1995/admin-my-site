import React, { FC, MutableRefObject, useEffect, useMemo, useRef } from "react";

import { EditorState, ContentState, convertFromHTML } from "draft-js";
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
}> = ({ setValue, errors, register, isSubmitted, trigger, watch }) => {
  const stylesUtils = useStylesUtil();

  const ref: MutableRefObject<any> = useRef();

  // const defaultEditorState = useMemo(() => {
  //   const blocksFromHTML = convertFromHTML(watch("aboutMeDescription"));
  //   const contentState = ContentState.createFromBlockArray(
  //     blocksFromHTML.contentBlocks,
  //     blocksFromHTML.entityMap
  //   );

  //   return blocksFromHTML;
  // }, [watch]);

  const uploadCallback = (file: File) => {
    return new Promise((resolve) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        resolve({ data: { link: reader.result } });
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    register("aboutMeDescription", { required: "Поле обязательно" });
  }, [register]);

  return (
    <FormRow>
      <FormLabel>Описание блока обо мне</FormLabel>
      <Editor
        editorClassName={`${stylesUtils.input} ${stylesUtils.editor}`}
        onChange={() => {
          const text = ref.current?.editor?.innerText || ref.current?.innerText;
          const html = ref.current?.editor || ref.current;
          if (text.trim().length === 0 && !html.querySelector("img")) {
            setValue("aboutMeDescription", "");
          } else {
            setValue("aboutMeDescription", html);
          }
          if (isSubmitted) trigger("aboutMeDescription");
        }}
        editorRef={(editorRef: unknown) => {
          ref.current = editorRef;
        }}
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
