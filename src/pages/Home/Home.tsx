/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
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
import FirstBlockImageInput from "./components/FirstBlockImageInput";

const Home = () => {
  const styles = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
    watch,
    setValue,
    trigger,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <Dashboard>
      <div>
        <h3 className={styles.pageTitle}>Главная страница</h3>
        <Form
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formPosition="baceline"
          className={`${styles.homeForm}`}
        >
          <FirstBlockImageInput
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            isSubmitted={isSubmitted}
            trigger={trigger}
          />
          <ButtonSubmit />
        </Form>
      </div>
    </Dashboard>
  );
};

export default Home;
