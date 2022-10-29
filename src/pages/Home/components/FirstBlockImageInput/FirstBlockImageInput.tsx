import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import React, { FC, useEffect } from "react";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types/form";
import ImageUploading from "react-images-uploading";
import useUtilsStyles from "utils/styles";
import useStyles from "./style";

const FirstBlockImageInput: FC<{
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
}> = ({ register, watch, setValue, errors, trigger, isSubmitted }) => {
  const utilsStyles = useUtilsStyles();
  const styles = useStyles();
  useEffect(() => {
    register("file", { required: "Выберите файл" });
  }, [register]);

  const maxNumber = 69;

  const onChange = (imageList: React.SetStateAction<unknown[]>) => {
    setValue("file", imageList);

    if (isSubmitted) {
      trigger("file");
    }
  };

  return (
    <FormRow>
      <FormLabel>
        Ссылка на картинку в первом блоке на главной странице
      </FormLabel>
      <ImageUploading
        multiple={false}
        value={watch("file")}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
          // write your building UI
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
                    src={image.data_url}
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
        )}
      </ImageUploading>

      <TextError message={errors.file?.message as string} />
    </FormRow>
  );
};

export default FirstBlockImageInput;
