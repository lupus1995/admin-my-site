import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import style from './Home.module.scss';
import ButtonSubmit from "commons/ButtonSubmit";
import Dashboard from "commons/Dashboard";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import { ResponseI } from "utils/interfaces";
import useStylesUtil from "utils/styles";

import { get, save } from "./api";
import { HomeEditor, BlockImageInput } from "./components";
import { HomeFormI } from "./interfaces";
import useStyles from "./style";

const Home = () => {
  const navigate = useNavigate();
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

  const onSubmit = (data: HomeFormI) => {
    save(data).then((response: ResponseI) => {
      toast(response.message, {
        type: response.status ? "success" : "error",
        hideProgressBar: true,
        theme: "colored",
      });

      if (response.redirectTo) {
        navigate(response.redirectTo);
      }
    });
  };

  useEffect(() => {
    get().then((result) => {
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        navigate(result.redirectTo);
      }

      Object.entries(result.responseBody).forEach(
        ([key, value]: [string, string]) => {
          register(key);
          setValue(key, value);
        }
      );
    });
  }, [navigate, register, setValue]);

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
          <BlockImageInput
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            isSubmitted={isSubmitted}
            trigger={trigger}
            name="firstBlockBackgroundImage"
            label="Ссылка на картинку в первом блоке на главной странице"
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
            <FormLabel>Подзаголовок в первом блоке</FormLabel>
            <input
              className={stylesUtils.input}
              type="text"
              {...register("firstBlockSubtitle", {
                required: "Поле обязательно",
              })}
            />
            <TextError message={errors.firstBlockSubtitle?.message as string} />
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

          <BlockImageInput
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            isSubmitted={isSubmitted}
            trigger={trigger}
            name="aboutMePhoto"
            label="Ссылка на фото в блоке обо мне"
          />

          <ButtonSubmit />
        </Form>
      </div>
    </Dashboard>
  );
};

export default Home;
