import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

import { ContactsI } from "./interface";

export const createFeedback = async ({
  data,
}: {
  data: ContactsI;
}): Promise<ResponseI<void>> => {
  const response = await fetch(`${URL}/feedback`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data, getCircularReplacer()),
  });

  if (response.status >= 400) {
    return {
      message: "errorCreateFeedback",
      status: false,
    };
  }

  const result = await response.json();

  return {
    status: true,
    message: "successCreateFeedback",
    responseBody: result,
  };
};
