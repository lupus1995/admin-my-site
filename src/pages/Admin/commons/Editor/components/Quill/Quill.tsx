import React, { FC, useEffect } from "react";

import classNames from "classnames";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import { useLanguage, usePrevious } from "utils/hooks";

import { EditorProps } from "../../types";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["link", "image"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: ["", "center", "right", "justify"] }],

  ["clean"], // remove formatting button
];

const Quill: FC<EditorProps> = ({
  watch,
  name,
  setValue,
  register,
  isDisabled,
  disabledClass,
  heightContainer,
}) => {
  const handleChange = (text: string) => {
    setValue(name, text);
  };

  const { t, language } = useLanguage();
  const prevLng = usePrevious(language);

  useEffect(() => {
    if (prevLng !== language) {
      register(name, { required: t("requiredText") });
    }
  }, [language, name, prevLng, register, t]);

  return (
    <ReactQuill
      theme="snow"
      value={watch(name)}
      onChange={handleChange}
      modules={{ toolbar: toolbarOptions }}
      style={{ height: `${heightContainer}px` }}
      readOnly={isDisabled}
      className={classNames({
        [disabledClass]: isDisabled,
      })}
    />
  );
};

export { Quill };
