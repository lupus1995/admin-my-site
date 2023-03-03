import React, { FC } from "react";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { EditorProps, EditorState } from "react-draft-wysiwyg";

import useStylesUtil from "utils/styles";

const EditorDraft = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditorContainer: FC<{
  initState: any;
  disabledClass: string;
  isDisabled: boolean;
  handleEditorChange: (editorState: EditorState) => void;
  uploadCallback: (file: File) => Promise<unknown>;
}> = ({
  initState,
  disabledClass,
  isDisabled,
  handleEditorChange,
  uploadCallback,
}) => {
  const stylesUtils = useStylesUtil();
  return (
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
  );
};

export default EditorContainer;
