import { URL } from "utils/constants";
import { TokenI } from "utils/interfaces";

import { SignInI } from "./interfaces";

export const signin = async (formData: SignInI): Promise<TokenI> => {
  const response = await fetch(`${URL}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    throw data.message;
  }

  return data;
};
