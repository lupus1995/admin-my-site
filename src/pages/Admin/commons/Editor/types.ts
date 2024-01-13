import {
  UseFormSetValue,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export enum EditorEnum {
  wysiwyg = "wysiwyg",
  quill = "Quill",
}

export type EditorType = EditorEnum.quill | EditorEnum.wysiwyg;

export interface EditorProps {
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isSubmitted: boolean;
  isDisabled: boolean;
  disabledClass: string;
  name: string;
  editorType?: EditorType;
  heightContainer?: number;
}
