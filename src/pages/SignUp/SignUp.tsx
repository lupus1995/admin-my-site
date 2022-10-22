import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TokenI } from 'utils/interfaces';
import { set } from 'local-storage';
import { signup } from './api';
import { SignUpI } from './interfaces';
import useStyles from './style';

const SignUp = () => {
  const style = useStyles();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const onSubmit = async (formData: SignUpI) => {
    try {
      const tokens: TokenI = await signup(formData);
      set('accressToken', tokens.accessToken);
      set('refreshToken', tokens.refreshToken);

      toast('Вы успешно зарегистрировали аккаунт', {
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
  const handleConfirmPassword = (confirmPassword: string) => {
    const password = watch('password');
    if (confirmPassword === password) {
      return true;
    }

    return 'Пароли не сопадают';
  };

  return (
    <div className={style.signupWrapper}>
      <form className={style.signupForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style.signupTitle}>Регистрация</h1>
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

        <div className={style.signupRow}>
          <label htmlFor="confirmPassword">
            <p className={style.signupLabel}>Повторите пароль</p>
            <input className={style.signupInput} type="password" id="confirmPassword" {...register('confirmPassword', { required: 'Поле обязательно', validate: handleConfirmPassword })} />
            {errors.confirmPassword?.message && <p className={style.signupError} role="alert">{errors.confirmPassword?.message}</p>}
          </label>
        </div>

        <div>
          <button className={style.signupButton} type="submit">Создать аккаунт</button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUp;
