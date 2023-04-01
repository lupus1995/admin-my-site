import { when } from "jest-when";

import { URL } from "utils/constants";

import { updateTokens } from "../apiTokens";

/**
 * проверка токенов при наличии access токена
 * запрос на обновление токенов пришел с отрицательным ответом
 */
jest.mock("local-storage", () => {
  const module = jest.requireActual("local-storage");

  const getMock = jest.fn();

  when(getMock)
    .calledWith("accessToken")
    .mockReturnValue("accessToken")
    .calledWith("refreshToken")
    .mockReturnValue(null);

  return {
    ...module,
    get: (arg: string) => getMock(arg),
    set: jest.fn,
  };
});

global.fetch = jest.fn((path) => {
  if (path === `${URL}/auth/access`) {
    return Promise.resolve({
      json: () => Promise.resolve(false),
    });
  }

  if (path === `${URL}/auth/refresh`)
    return Promise.resolve({
      status: 403,
    });
}) as jest.Mock;

const trueResult = {
  status: false,
  message: "errorToken",
  redirectTo: "/signin",
};

describe("check utils", () => {
  it("check access token", async () => {
    const result = await updateTokens();

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
