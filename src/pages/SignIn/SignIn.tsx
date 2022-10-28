import { set } from "local-storage";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { TokenI } from "utils/interfaces";
import useUtilStyles from "utils/styles";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
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
  const onSubmit = async (formData: SignInI) => {
    try {
      const tokens: TokenI = await signin(formData);
      set("accressToken", tokens.accessToken);
      set("refreshToken", tokens.refreshToken);

      toast("Вы успешно авторизовались", {
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
  return (
    <Form
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className={`${style.signupForm}`}
    >
      <h1 className={style.signupTitle}>Авторизация</h1>
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
        <button className={style.signupButton} type="submit">
          Отправить
        </button>
      </FormRow>

      <div className={style.signupText}>
        <span>Вы не имеете аккаунт?</span>{" "}
        <Link className={style.signupLink} to="/signup">
          Зарегистрируйтесь
        </Link>
      </div>

      <ToastContainer />
    </Form>
  );
};

export default SignIn;
