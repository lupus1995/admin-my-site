import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import ImageUploading, { ImageListType } from "react-images-uploading";

import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";

import { EmptyList, ListWithItem } from "./components";
import { BlockImageInputI } from "./interface";
import useStyles from "./style";

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
}) => {
  const [currentValues, setCurrentValues] = useState<ImageListType>([]);
  const [isInitValues, setIsInitValues] = useState<boolean>(false);
  const styles = useStyles();
  useEffect(() => {
    const nameValue = watch(name);
    if (!isInitValues) {
      if (nameValue) setCurrentValues([{ data_url: nameValue }]);
      setIsInitValues(!isInitValues);
    }
  }, [name, isInitValues, watch]);

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
