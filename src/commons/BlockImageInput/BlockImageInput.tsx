import React, { FC, useEffect, useState } from "react";

import classNames from "classnames";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import ImageUploading, { ImageListType } from "react-images-uploading";

import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import useUtilsStyles from "utils/styles";

import useStyles from "./style";

const BlockImageInput: FC<{
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
  isSubmitted: boolean;
  trigger: UseFormTrigger<FieldValues>;
  name: string;
  label: string;
  isDisabled: boolean;
  disabledClass: string;
}> = ({
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
  const utilsStyles = useUtilsStyles();
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
                  <button
                    className={classNames(
                      `${utilsStyles.button} ${styles.buttonUpload}`,
                      {
                        [disabledClass]: isDisabled,
                      }
                    )}
                    type="button"
                    onClick={onImageUpload}
                  >
                    Загрузить картинку
                  </button>
                )}

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <FormRow>
                      <img
                        className={`${styles.image}`}
                        src={image?.data_url}
                        alt={label}
                      />
                    </FormRow>
                    <div className={styles.imageManage}>
                      <button
                        className={classNames(
                          `${utilsStyles.button} ${styles.imageManageMR}`,
                          {
                            [disabledClass]: isDisabled,
                          }
                        )}
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        Обновить
                      </button>
                      <button
                        className={classNames(`${utilsStyles.button}`, {
                          [disabledClass]: isDisabled,
                        })}
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
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
