import React, { FC, useEffect, useState } from "react";

import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
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
  register: UseFormRegister<FieldValues>;
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
}> = ({
  register,
  setValue,
  errors,
  trigger,
  isSubmitted,
  name,
  label,
  watch,
}) => {
  const [currentValues, setCurrentValues] = useState<ImageListType>([]);
  const [isInitValues, setIsInitValues] = useState<boolean>(false);
  const utilsStyles = useUtilsStyles();
  const styles = useStyles();
  useEffect(() => {
    console.log(watch());
    if (!isInitValues) {
      register(name, { required: "Выберите файл" });
      setCurrentValues([{ data_url: watch(name) }]);
      setIsInitValues(!isInitValues);
    }
  }, [register, name, isInitValues, watch]);

  const maxNumber = 1;

  const onChange = (imageList: ImageListType) => {
    setCurrentValues(imageList);
    setValue(name, imageList[0].data_url);

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
          }}
        >
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
            console.log("imageList", imageList);
            return (
              <div className="upload__image-wrapper">
                {imageList.length === 0 && (
                  <button
                    className={`${utilsStyles.button} ${styles.buttonUpload}`}
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
                        alt="картинка в первом блоке на главной странице"
                      />
                    </FormRow>
                    <div className={styles.imageManage}>
                      <button
                        className={`${utilsStyles.button} ${styles.imageManageMR}`}
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        Обновить
                      </button>
                      <button
                        className={utilsStyles.button}
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
