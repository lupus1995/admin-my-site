import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { TokenI } from 'utils/interfaces';
import { set } from 'local-storage';
import { signup } from './api';
import { SignUpI } from './interfaces';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const onSubmit = async (formData: SignUpI) => {
    try {
      const tokens: TokenI = await signup(formData);
      set('accressToken', tokens.accessToken);
      set('refreshToken', tokens.refreshToken);

      toast('Вы успешно зарегистрировали аккаунт');
    } catch (e: unknown) {
      toast(e, { type: 'error', hideProgressBar: true, theme: 'colored' });
      setError('username', { type: 'custom', message: '' });
    }
  };
  const handleConfirmPassword = (confirmPassword: string) => {
    const password = watch('password');
    if (confirmPassword === password) {
      return true;
    }

    return 'Пароли не сопадают';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">
          <p>Имя пользователя</p>
          <input type="text" id="username" {...register('username', { required: 'Поле обязательно' })} />
          {errors.username?.message && <p role="alert">{errors.username?.message}</p>}
        </label>
      </div>

      <div>
        <label htmlFor="password">
          <p>Пароль</p>
          <input type="password" id="password" {...register('password', { required: 'Поле обязательно' })} />
          {errors.password?.message && <p role="alert">{errors.password?.message}</p>}
        </label>
      </div>

      <div>
        <label htmlFor="confirmPassword">
          <p>Повторите пароль</p>
          <input type="password" id="confirmPassword" {...register('confirmPassword', { required: 'Поле обязательно', validate: handleConfirmPassword })} />
          {errors.confirmPassword?.message && <p role="alert">{errors.confirmPassword?.message}</p>}
        </label>
      </div>

      <div>
        <button type="submit">Отправить</button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default SignUp;
