import React, { useRef } from "react";

import classNames from "classnames";
import { set } from "local-storage";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Controller, useForm } from "react-hook-form";

import { SignupI, useSignupMutation } from "websockets/entities/Auth";
import { Heading } from "websockets/share";

import {
  ButtonWrapper,
  InputWrapper,
  InputWrapperError,
  WrapperForm,
  WrapperMain,
  useStyles,
} from "../components";

const Signup = () => {
  const styles = useStyles();
  const { push } = useRouter();
  const toast = useRef(null);
  const [fetchData] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data: SignupI) => {
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

  const handleClick = () => push("/websockets/signin");

  return (
    <WrapperMain>
      <Toast ref={toast} />
      <Heading classes={classNames(`${styles.heading}`)} type="h1">
        Регистрция в чате
      </Heading>

      <WrapperForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputWrapper>
            <span className="p-float-label">
              <InputText
                className={classNames(`${styles.input}`, {
                  ["p-invalid"]: errors.firstname,
                })}
                {...register("firstname", {
                  required: "Поле обязательно",
                })}
              />
              <label htmlFor="username">Имя</label>
            </span>
            <InputWrapperError visibleError={Boolean(errors.firstname)}>
              {errors.firstname?.message}
            </InputWrapperError>
          </InputWrapper>
          <InputWrapper>
            <span className="p-float-label">
              <InputText
                className={classNames(`${styles.input}`, {
                  ["p-invalid"]: errors.lastname,
                })}
                {...register("lastname", {
                  required: "Поле обязательно",
                })}
              />
              <label htmlFor="lastname">Фамилия</label>
            </span>
            <InputWrapperError visibleError={Boolean(errors.lastname)}>
              {errors.lastname?.message}
            </InputWrapperError>
          </InputWrapper>
          <InputWrapper>
            <span className="p-float-label">
              <InputText
                className={classNames(`${styles.input}`, {
                  ["p-invalid"]: errors.username,
                })}
                {...register("username", {
                  required: "Поле обязательно",
                })}
              />
              <label htmlFor="username">Username</label>
            </span>
            <InputWrapperError visibleError={Boolean(errors.username)}>
              {errors.username?.message}
            </InputWrapperError>
          </InputWrapper>
          <InputWrapper>
            <span className="p-float-label">
              <InputText
                className={classNames(`${styles.input}`, {
                  ["p-invalid"]: errors.email,
                })}
                id="email"
                {...register("email", {
                  required: "Поле обязательно",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Введены не валидные данные",
                  },
                })}
              />
              <label htmlFor="email">E-mail</label>
            </span>
            <InputWrapperError visibleError={Boolean(errors.email)}>
              {errors.email?.message}
            </InputWrapperError>
          </InputWrapper>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Поле обязательно",
              minLength: {
                value: 12,
                message: "Минимальная длина пароля 12 символов",
              },
            }}
            render={({ field, fieldState }) => (
              <InputWrapper>
                <span className="p-float-label">
                  <Password
                    id={field.name}
                    {...field}
                    inputRef={field.ref}
                    feedback={false}
                    className={classNames(`${styles.input}`, {
                      ["p-invalid"]: fieldState.error,
                    })}
                  />
                  <label htmlFor={field.name}>Пароль</label>
                </span>
                <InputWrapperError visibleError={Boolean(fieldState.error)}>
                  {fieldState?.error?.message}
                </InputWrapperError>
              </InputWrapper>
            )}
          />
        </div>

        <ButtonWrapper>
          <Button type="submit" label="Отправить" />
        </ButtonWrapper>

        <ButtonWrapper>
          <Button
            type="button"
            label="Авторизация"
            onClick={handleClick}
            link
          />
        </ButtonWrapper>
      </WrapperForm>
    </WrapperMain>
  );
};

export default Signup;
