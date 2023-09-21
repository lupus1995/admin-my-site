import React from "react";

import classNames from "classnames";
import { set } from "local-storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { useSignupMutation } from "store/services/auth/AuthService";
import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { SignUpI } from "./interfaces";
import useStyles from "./style";
import { ButtonSubmit, Form, FormLabel, FormRow, TextError } from "../commons";
import { useDisabled } from "../hooks";

const SignUp = () => {
  const { t } = useLanguage();
  const style = useStyles();
  const stylesUtil = useUtilsStyles();
  const { push } = useRouter();
  const [fetchData] = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const { isDisabled, setIsDisabled, disabledClass } = useDisabled();
  const onSubmit = async (formData: SignUpI) => {
    setIsDisabled(true);
    const result = await fetchData(formData);
    if ("error" in result) {
      toast("Ошибка заполнения формы", {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });
      setError("username", { type: "custom", message: "" });
    } else {
      set("accessToken", result.data.data.accessToken);
      set("refreshToken", result.data.data.refreshToken);

      toast(t("successRegister"), {
        type: "success",
        hideProgressBar: true,
        theme: "colored",
      });
      push("/admin");
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
        <Link className={style.signupLink} href="/signin">
          {t("login")}
        </Link>
      </div>

      <ToastContainer />
    </Form>
  );
};

export default SignUp;
