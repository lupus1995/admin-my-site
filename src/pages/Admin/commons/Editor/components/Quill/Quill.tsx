import React, { FC, forwardRef, useEffect, useMemo, useRef } from "react";

import classNames from "classnames";
import hljs from "highlight.js";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai.min.css";
import { useLanguage, usePrevious } from "utils/hooks";

import { toolbarOptions } from "./constants";
import { EditorProps } from "../../types";

const ReactQuill = dynamic(
  async () => {
    hljs.configure({
      // optionally configure hljs
      languages: ["javascript"],
    });
    // @ts-ignore
    window.hljs = hljs;
    const { default: RQ } = await import("react-quill");
    const { default: ImageLoader } = await import(
      "@writergate/quill-image-uploader-nextjs"
    );

    RQ.Quill.register("modules/imageUploader", ImageLoader);

    // @ts-ignore
    return forwardRef((props, ref) => <RQ ref={ref} {...props} />);
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
  handleUploadImage,
}) => {
  const quillRef = useRef(null);
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

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
      },
      imageUploader: {
        upload: handleUploadImage,
      },
      syntax: true,
    }),
    [handleUploadImage]
  );

  return (
    <ReactQuill
      // @ts-ignore
      theme="snow"
      value={watch(name)}
      onChange={handleChange}
      modules={modules}
      style={{ height: `${heightContainer}px` }}
      readOnly={isDisabled}
      className={classNames({
        [disabledClass]: isDisabled,
      })}
      ref={quillRef}
    />
  );
};

export { Quill };
