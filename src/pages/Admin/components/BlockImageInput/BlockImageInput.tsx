import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import ImageUploading, { ImageListType } from "react-images-uploading";

import { useImageName } from "commons/HookGetSizeImage/hook";
import { useUpdateTextError } from "pages/Admin/hooks";
import { useLanguage } from "utils/hooks";

import { EmptyList, ListWithItem } from "./components";
import { BlockImageInputI } from "./interface";
import useStyles from "./style";
import { FormRow, FormLabel, TextError } from "../../commons";

const BlockImageInput: FC<BlockImageInputI> = ({
  setValue,
  errors,
  trigger,
  isSubmitted,
  name,
  label,
  watch,
  isDisabled,
  disabledClass,
  register,
}) => {
  const { t } = useLanguage();
  const { imageUrl } = useImageName({
    imageName: watch(name),
  });
  useUpdateTextError({ trigger, isSubmitted });
  const [currentValues, setCurrentValues] = useState<ImageListType>([]);
  const [isInitValues, setIsInitValues] = useState<boolean>(false);
  const styles = useStyles();
  useEffect(() => {
    if (!isInitValues && imageUrl) {
      setCurrentValues([{ data_url: imageUrl }]);
      setIsInitValues(!isInitValues);
    }

    if (!isInitValues && imageUrl === undefined) {
      setIsInitValues(!isInitValues);
    }

    register(name, { required: t("selectedFile") });
  }, [name, isInitValues, watch, register, t, imageUrl]);

  const maxNumber = 1;

  const onChange = (imageList: ImageListType) => {
    setCurrentValues(imageList);
    setValue(name, imageList[0]?.data_url || undefined);

    if (isSubmitted) {
      trigger(name);
    }
  };

  return (
    <FormRow>
      <FormLabel>{label}</FormLabel>
      {isInitValues && (
        <ImageUploading
          multiple={false}
          value={currentValues}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          inputProps={{
            name,
            className: classNames({
              [disabledClass]: isDisabled,
            }),
          }}
        >
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
            return (
              <div className="upload__image-wrapper">
                {imageList.length === 0 && (
                  <EmptyList
                    onImageUpload={onImageUpload}
                    disabledClass={disabledClass}
                    isDisabled={isDisabled}
                    classesForButton={styles.buttonUpload}
                  />
                )}

                {imageList.map((image, index) => (
                  <ListWithItem
                    key={index}
                    disabledClass={disabledClass}
                    isDisabled={isDisabled}
                    image={image}
                    label={label}
                    onImageUpdate={onImageUpdate}
                    onImageRemove={onImageRemove}
                    index={index}
                  />
                ))}
              </div>
            );
          }}
        </ImageUploading>
      )}

      <TextError message={errors[name]?.message as string} />
    </FormRow>
  );
};

export default BlockImageInput;
