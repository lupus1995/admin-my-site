import React, { FC, useEffect } from "react";

import classNames from "classnames";
import hljs from "highlight.js";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai.min.css";
import { useLanguage, usePrevious } from "utils/hooks";

import { toolbarOptions } from "./constants";
import { EditorProps } from "../../types";

const ReactQuill = dynamic(
  () => {
    hljs.configure({
      // optionally configure hljs
      languages: ["javascript"],
    });
    // @ts-ignore
    window.hljs = hljs;
    return import("react-quill");
  },
  {
    ssr: false,
  }
);

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
      modules={{
        toolbar: {
          container: toolbarOptions,
        },
        syntax: true,
      }}
      style={{ height: `${heightContainer}px` }}
      readOnly={isDisabled}
      className={classNames({
        [disabledClass]: isDisabled,
      })}
    />
  );
};

export { Quill };
