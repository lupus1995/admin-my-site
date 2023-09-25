import React from "react";

import classNames from "classnames";
import { set } from "local-storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useSigninMutation } from "store/services/auth/AuthService";
import { useLanguage } from "utils/hooks";
import useUtilStyles from "utils/styles";

import { SignInI } from "./interfaces";
import useStyles from "./style";
import { ButtonSubmit, Form, FormLabel, FormRow, TextError } from "../commons";
import { useDisabled } from "../hooks";

const SignIn = () => {
  const [fetchData] = useSigninMutation();
  const { t } = useLanguage();
  const { push } = useRouter();
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
    setIsDisabled(true);
    const result = await fetchData(formData);
    if ("error" in result) {
      toast("Ошибка авторизации, попробуйте позже повторить попытку", {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });
      setError("username", { type: "custom", message: "" });
    } else {
      set("accessToken", result.data.data.accessToken);
      set("refreshToken", result.data.data.refreshToken);

      toast(t("signInSuccess"), {
        type: "success",
        hideProgressBar: true,
        theme: "colored",
      });
      push("/admin");
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
      <h1 className={style.signupTitle}>{t("signinTitle")}</h1>
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
        <ButtonSubmit isDisabled={isDisabled} disabledClass={disabledClass} />
      </FormRow>

      <div className={style.signupText}>
        <span>{t("hasNoAccount")}</span>{" "}
        <Link className={style.signupLink} href="/signup">
          {t("register")}
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
