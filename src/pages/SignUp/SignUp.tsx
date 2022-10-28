import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TokenI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";
import { set } from "local-storage";
import Form from "commons/Form";
import { signup } from "./api";
import { SignUpI } from "./interfaces";
import useStyles from "./style";
import FormRow from "commons/FormRow";
import FormLabel from "commons/FormLabel";
import TextError from "commons/TextError";

const SignUp = () => {
  const style = useStyles();
  const stylesUtil = useUtilsStyles();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (formData: SignUpI) => {
    try {
      const tokens: TokenI = await signup(formData);
      set("accressToken", tokens.accessToken);
      set("refreshToken", tokens.refreshToken);

      toast("Вы успешно зарегистрировали аккаунт", {
        type: "success",
        hideProgressBar: true,
        theme: "colored",
        onClose: () => navigate("/"),
      });
    } catch (e: unknown) {
      toast(e, { type: "error", hideProgressBar: true, theme: "colored" });
      setError("username", { type: "custom", message: "" });
    }
  };
  const handleConfirmPassword = (confirmPassword: string) => {
    const password = watch("password");
    if (confirmPassword === password) {
      return true;
    }

    return "Пароли не сопадают";
  };

  return (
    <Form
      className={`${style.signupForm}`}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <h1 className={style.signupTitle}>Регистрация</h1>
      <FormRow>
        <FormLabel>Имя пользователя</FormLabel>
        <input
          className={stylesUtil.input}
          type="text"
          {...register("username", { required: "Поле обязательно" })}
        />
        <TextError message={errors.username?.message as string} />
      </FormRow>

      <FormRow>
        <FormLabel>Пароль</FormLabel>
        <input
          className={stylesUtil.input}
          type="password"
          {...register("password", { required: "Поле обязательно" })}
        />
        <TextError message={errors.password?.message as string} />
      </FormRow>

      <FormRow>
        <FormLabel>Повторите пароль</FormLabel>
        <input
          className={stylesUtil.input}
          type="password"
          {...register("confirmPassword", {
            required: "Поле обязательно",
            validate: handleConfirmPassword,
          })}
        />
        <TextError message={errors.confirmPassword?.message as string} />
      </FormRow>

      <FormRow>
        <button className={style.signupButton} type="submit">
          Создать аккаунт
        </button>
      </FormRow>

      <div className={style.signupText}>
        <span>Вы имеете аккаунт?</span>{" "}
        <Link className={style.signupLink} to="/signin">
          Авторизуйтесь
        </Link>
      </div>

      <ToastContainer />
    </Form>
  );
};

export default SignUp;
