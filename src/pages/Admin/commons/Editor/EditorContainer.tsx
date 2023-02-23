import React, { FC } from "react";

import classNames from "classnames";
import { Editor as EditorDraft, EditorState } from "react-draft-wysiwyg";

import useStylesUtil from "utils/styles";

const EditorContainer: FC<{
  initState: unknown;
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
      // @ts-ignore
      defaultContentState={initState}
    />
  );
};

export default EditorContainer;
