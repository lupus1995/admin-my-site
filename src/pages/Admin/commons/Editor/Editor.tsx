import React, { FC } from "react";

import { Quill, Wysiwyg } from "./components";
import { EditorEnum, EditorProps } from "./types";

export const Editor: FC<EditorProps> = ({
  editorType = EditorEnum.quill,
  ...otherProps
}) => {
  if (editorType === EditorEnum.quill) {
    return <Quill {...otherProps} />;
  }

  if (editorType === EditorEnum.wysiwyg) {
    return <Wysiwyg {...otherProps} />;
  }

  return null;
};
