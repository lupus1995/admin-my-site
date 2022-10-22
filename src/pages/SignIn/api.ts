import { TokenI } from 'utils/interfaces';
import { URL } from 'utils/constants';
import { SignInI } from './interfaces';

export const signin = async (formData: SignInI): Promise<TokenI> => {
  const response = await fetch(`${URL}/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    const message = data.message.join('\n');
    // eslint-disable-next-line no-console
    console.log('data.message', data.message.join(','));
    throw message;
  }

  return data;
};