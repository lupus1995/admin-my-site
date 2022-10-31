import React from "react";

import { useForm } from "react-hook-form";

// import style from './Home.module.scss';
import ButtonSubmit from "commons/ButtonSubmit";
import Dashboard from "commons/Dashboard";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import useStylesUtil from "utils/styles";

import { HomeEditor, FirstBlockImageInput } from "./components";
import useStyles from "./style";

const Home = () => {
  const styles = useStyles();
  const stylesUtils = useStylesUtil();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
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

          <FormRow>
            <FormLabel>Заголовок в первом блоке</FormLabel>
            <input
              className={stylesUtils.input}
              type="text"
              {...register("firstBlockTitle", { required: "Поле обязательно" })}
            />
            <TextError message={errors.firstBlockTitle?.message as string} />
          </FormRow>

          <FormRow>
            <FormLabel>Заголовок блока обо мне</FormLabel>
            <input
              className={stylesUtils.input}
              type="text"
              {...register("aboutMeTitle", { required: "Поле обязательно" })}
            />
            <TextError message={errors.aboutMeTitle?.message as string} />
          </FormRow>

          <HomeEditor
            register={register}
            setValue={setValue}
            errors={errors}
            isSubmitted={isSubmitted}
            trigger={trigger}
            watch={watch}
          />

          <ButtonSubmit />
        </Form>
      </div>
    </Dashboard>
  );
};

export default Home;
