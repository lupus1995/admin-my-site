import { ProjectI } from "pages/interface";
import { getTokens, updateTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

export const saveProject = async (data: ProjectI) => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const requestUrl = data?._id
      ? `${URL}/projects/${data?._id}`
      : `${URL}/projects`;
    const method = data?._id ? "put" : "post";
    const response = await fetch(requestUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data, getCircularReplacer()),
    });

    if (response.status >= 400) {
      return {
        message: "errorSaveOrUpdateProject",
        status: false,
      };
    }

    const { _id }: { _id: string } = await response.json();

    return {
      message: "successSaveForm",
      status: true,
      redirectTo: `/admin/projects/edit/${data?._id || _id}`,
    };
  }
};

// получение данных по всем проектам
export const getProjects = async (): Promise<ResponseI<ProjectI[] | void>> => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/projects?hasFilter=true`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorGetProjects",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }
};

// получение данных по одному проекту
export const getProject = async ({
  id,
}: {
  id: string;
}): Promise<ResponseI<ProjectI | void>> => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status && typeof id === "string") {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/projects/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorGetProject",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }
};

// удаление проекта
export const deletedProject = async (
  projectId: string
): Promise<ResponseI<void>> => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/articles/${projectId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorDeletePrject",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }

  return hasCorrectokens;
};
