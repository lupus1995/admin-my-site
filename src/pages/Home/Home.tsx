/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { MutableRefObject, useMemo, useRef } from "react";
import Dashboard from "commons/Dashboard";
// import style from './Home.module.scss';
import useStyles from "./style";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import Form from "commons/Form";
import FormRow from "commons/FormRow";
import ButtonSubmit from "commons/ButtonSubmit";
import TextError from "commons/TextError";
import FormLabel from "commons/FormLabel";

const Home = () => {
  const styles = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm();

  console.log("watch", watch());

  const refInput: MutableRefObject<HTMLInputElement> = useRef(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  console.log("errors", errors);
  const inputProps = useMemo(() => {
    return register("file", {
      required: "Необходимо загрузить картинку",
      onChange(event) {
        console.log("event.target.files[0]", event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setValue("file", event.target.files[0]);
      },
    });
  }, [register, setValue]);

  const handleChangeUpdate = () => {
    console.log(refInput.current?.click());
  };
  const handleChangeDelete = () => setImageUrl("");

  console.log("imageUrl", imageUrl);
  return (
    <Dashboard>
      <div>
        <h3 className={styles.pageTitle}>Главная страница</h3>
        <Form
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formPosition="baceline"
        >
          <FormRow>
            <FormLabel>
              Ссылка на картинку в первом блоке на главной странице
            </FormLabel>
            <input
              type="file"
              style={{ display: "none" }}
              {...inputProps}
              ref={(ref) => (refInput.current = ref)}
              onChange={inputProps.onChange}
            />
            <button type="button" onClick={handleChangeUpdate}>
              Загрузить картинку
            </button>
            {imageUrl && (
              <>
                <img
                  src={imageUrl}
                  alt="Картинка в первом блоке на главной странице"
                />
                <button onClick={handleChangeUpdate} type="button">
                  Обновить
                </button>
                <button onClick={handleChangeDelete} type="button">
                  Удалить
                </button>
              </>
            )}

            <TextError message={errors.file?.message as string} />
          </FormRow>

          <FormRow>
            <ButtonSubmit />
          </FormRow>
        </Form>
      </div>
    </Dashboard>
  );
};

export default Home;
