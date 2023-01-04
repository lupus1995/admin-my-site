import { URL } from "utils/constants";
import { TokenI } from "utils/interfaces";

import { SignUpI } from "./interfaces";

export const signup = async (formData: SignUpI): Promise<TokenI> => {
  const response = await fetch(`${URL}/auth/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    const message = data.message.join("\n");
    throw message;
  }

  return data;
};
