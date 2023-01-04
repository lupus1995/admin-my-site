import { when } from "jest-when";

import { checkToken } from "../apiTokens";

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
  if (path === "http://localhost:3000/auth/access") {
    return Promise.resolve({
      json: () => Promise.resolve(false),
    });
  }

  if (path === "http://localhost:3000/auth/refresh")
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        }),
    });
}) as jest.Mock;

const trueResult = {
  status: true,
  message: "successToken",
  redirectTo: "/signin",
};

describe("check utils", () => {
  it("check access token", async () => {
    const result = await checkToken();

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
