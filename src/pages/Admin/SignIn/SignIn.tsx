import React from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ButtonSubmit from "commons/ButtonSubmit";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import { TokenI } from "utils/interfaces";
import useUtilStyles from "utils/styles";

import { useDisabled } from "../hooks";
import { signin } from "./api";
import { SignInI } from "./interfaces";
import useStyles from "./style";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const style = useStyles();
  const stylesUtil = useUtilStyles();
  const { disabledClass, isDisabled, setIsDisabled } = useDisabled();
  const onSubmit = async (formData: SignInI) => {
    try {
      setIsDisabled(true);
      const tokens: TokenI = await signin(formData);
      set("accessToken", tokens.accessToken);
      set("refreshToken", tokens.refreshToken);

      toast("Вы успешно авторизовались", {
        type: "success",
        hideProgressBar: true,
        theme: "colored",
      });
      navigate("/admin");
    } catch (e: unknown) {
      toast(e, { type: "error", hideProgressBar: true, theme: "colored" });
      setError("username", { type: "custom", message: "" });
    }

    setIsDisabled(false);
  };
  return (
    <Form
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className={`${style.signupForm}`}
      formPosition="center"
      isCenter
    >
      <h1 className={style.signupTitle}>Авторизация</h1>
      <FormRow>
        <FormLabel>Имя пользователя</FormLabel>
        <input
          className={classNames(`${stylesUtil.input}`, {
            [disabledClass]: isDisabled,
          })}
          type="text"
          {...register("username", { required: "Поле обязательно" })}
        />
        <TextError message={errors.username?.message as string} />
      </FormRow>

      <FormRow>
        <FormLabel>Пароль</FormLabel>
        <input
          className={classNames(`${stylesUtil.input}`, {
            [disabledClass]: isDisabled,
          })}
          type="password"
          {...register("password", { required: "Поле обязательно" })}
        />
        <TextError message={errors.password?.message as string} />
      </FormRow>

      <FormRow>
        <ButtonSubmit isDisabled={isDisabled} disabledClass={disabledClass} />
      </FormRow>

      <div className={style.signupText}>
        <span>Вы не имеете аккаунт?</span>{" "}
        <Link className={style.signupLink} to="/signup">
          Зарегистрируйтесь
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
