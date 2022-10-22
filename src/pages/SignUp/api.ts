import { TokenI } from "utils/interfaces";
import { URL } from "utils/constants";
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
    // eslint-disable-next-line no-console
    console.log("data.message", data.message.join(","));
    throw message;
  }

  return data;
};
