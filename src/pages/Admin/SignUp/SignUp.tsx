import React from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import ButtonSubmit from "commons/ButtonSubmit";
import Form from "commons/Form";
import FormLabel from "commons/FormLabel";
import FormRow from "commons/FormRow";
import TextError from "commons/TextError";
import { TokenI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";

import { useDisabled } from "../hooks";
import { signup } from "./api";
import { SignUpI } from "./interfaces";
import useStyles from "./style";

const SignUp = () => {
  const { t } = useTranslation();
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
  const { isDisabled, setIsDisabled, disabledClass } = useDisabled();
  const onSubmit = async (formData: SignUpI) => {
    try {
      setIsDisabled(true);
      const tokens: TokenI = await signup(formData);
      set("accessToken", tokens.accessToken);
      set("refreshToken", tokens.refreshToken);

      toast(t("successRegister"), {
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
  const handleConfirmPassword = (confirmPassword: string) => {
    const password = watch("password");
    if (confirmPassword === password) {
      return true;
    }

    return t("passwordDontRepeat");
  };

  return (
    <Form
      className={`${style.signupForm}`}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      formPosition="center"
      isCenter
    >
      <h1 className={style.signupTitle}>{t("signupTitle")}</h1>
      <FormRow>
        <FormLabel>{t("usernameLabel")}</FormLabel>
        <input
          className={classNames(`${stylesUtil.input}`, {
            [disabledClass]: isDisabled,
          })}
          type="text"
          {...register("username", { required: t("requiredText") })}
        />
        <TextError message={errors.username?.message as string} />
      </FormRow>

      <FormRow>
        <FormLabel>{t("passwordLabel")}</FormLabel>
        <input
          className={classNames(`${stylesUtil.input}`, {
            [disabledClass]: isDisabled,
          })}
          type="password"
          {...register("password", { required: t("requiredText") })}
        />
        <TextError message={errors.password?.message as string} />
      </FormRow>

      <FormRow>
        <FormLabel>{t("repeatPasswordLabel")}</FormLabel>
        <input
          className={classNames(`${stylesUtil.input}`, {
            [disabledClass]: isDisabled,
          })}
          type="password"
          {...register("confirmPassword", {
            required: t("requiredText"),
            validate: handleConfirmPassword,
          })}
        />
        <TextError message={errors.confirmPassword?.message as string} />
      </FormRow>

      <FormRow>
        <ButtonSubmit isDisabled={isDisabled} disabledClass={disabledClass} />
      </FormRow>

      <div className={style.signupText}>
        <span>{t("hasAccount")}</span>{" "}
        <Link className={style.signupLink} to="/signin">
          {t("login")}
        </Link>
      </div>

      <ToastContainer />
    </Form>
  );
};

export default SignUp;
