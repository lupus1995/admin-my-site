import { ProjectI } from "pages/interface";
import { URL } from "utils/constants";

// получение проектов
export const getProjects = async ({ message }: { message: string }) => {
  const response = await fetch(`${URL}/projects`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status >= 400) {
    return {
      message,
      status: false,
    };
  }

  const result: ProjectI[] = await response.json();

  return {
    responseBody: result,
    status: true,
  };
};
