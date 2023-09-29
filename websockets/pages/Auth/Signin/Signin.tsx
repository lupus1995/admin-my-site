import React, { useRef } from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";

import { LoginI, useSigninMutation } from "websockets/entities/Auth";
import { Heading } from "websockets/share";

import {
  ButtonWrapper,
  InputWrapper,
  InputWrapperError,
  WrapperForm,
  WrapperMain,
  useStyles,
} from "../components";

const Signin = () => {
  const styles = useStyles();
  const { push } = useRouter();
  const toast = useRef(null);
  const [fetchData] = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: LoginI) => {
    const result = await fetchData(data);
    if ("error" in result) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: "Ошибка заполнения форма",
        life: 3000,
      });
    } else {
      set("accessToken", result.data.data.accessToken);
      set("refreshToken", result.data.data.refreshToken);

      toast.current.show({
        severity: "success",
        detail: "Вы успешно зарегистрировались",
        life: 3000,
      });
      push("/websockets");
    }
  };

  const handleClick = () => push("/websockets/signup");

  return (
    <WrapperMain>
      <Toast ref={toast} />
      <div>
        <Heading classes={styles.heading} type="h1">
          Авторизация в чате
        </Heading>

        <WrapperForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputWrapper>
              <span className="p-float-label">
                <InputText
                  className={classNames(`${styles.input}`, {
                    ["p-invalid"]: errors.usernameOrEmail,
                  })}
                  {...register("usernameOrEmail", {
                    required: "Поле обязательно",
                  })}
                />
                <label htmlFor="username">Uername/email</label>
              </span>
              <InputWrapperError visibleError={Boolean(errors.usernameOrEmai)}>
                {errors.usernameOrEmail?.message}
              </InputWrapperError>
            </InputWrapper>

            <InputWrapper>
              <span className="p-float-label">
                <InputText
                  className={classNames(`${styles.input}`, {
                    ["p-invalid"]: errors.password,
                  })}
                  id="password"
                  {...register("password", {
                    required: "Поле обязательно",
                  })}
                />
                <label htmlFor="password">Пароль</label>
              </span>
              <InputWrapperError visibleError={Boolean(errors.password)}>
                {errors.password?.message}
              </InputWrapperError>
            </InputWrapper>
          </div>
          <ButtonWrapper>
            <Button label="Отправить" />
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              type="button"
              label="Регистрация"
              onClick={handleClick}
              link
            />
          </ButtonWrapper>
        </WrapperForm>
      </div>
    </WrapperMain>
  );
};

export default Signin;
