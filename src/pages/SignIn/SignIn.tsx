import { set } from 'local-storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { TokenI } from 'utils/interfaces';
import { signin } from './api';
import { SignInI } from './interfaces';
import useStyles from './style';

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const style = useStyles();
  const onSubmit = async (formData: SignInI) => {
    try {
      const tokens: TokenI = await signin(formData);
      set('accressToken', tokens.accessToken);
      set('refreshToken', tokens.refreshToken);

      toast('Вы успешно авторизовались', {
        type: 'success',
        hideProgressBar: true,
        theme: 'colored',
        onClose: () => navigate('/'),
      });
    } catch (e: unknown) {
      toast(e, { type: 'error', hideProgressBar: true, theme: 'colored' });
      setError('username', { type: 'custom', message: '' });
    }
  };
  return <div className={style.signupWrapper}>
    <form className={style.signupForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={style.signupTitle}>Авторизация</h1>
      <div className={style.signupRow}>
        <label htmlFor="username">
          <p className={style.signupLabel}>Имя пользователя</p>
          <input className={style.signupInput} type="text" id="username" {...register('username', { required: 'Поле обязательно' })} />
          {errors.username?.message && <p className={style.signupError} role="alert">{errors.username?.message}</p>}
        </label>
      </div>

      <div className={style.signupRow}>
        <label htmlFor="password">
          <p className={style.signupLabel}>Пароль</p>
          <input className={style.signupInput} type="password" id="password" {...register('password', { required: 'Поле обязательно' })} />
          {errors.password?.message && <p className={style.signupError} role="alert">{errors.password?.message}</p>}
        </label>
      </div>

      <div>
        <button className={style.signupButton} type="submit">Отправить</button>
      </div>

      <ToastContainer />
    </form>
  </div>;
};

export default SignIn;
