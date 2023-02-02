import { when } from "jest-when";

import { updateTokens } from "../apiTokens";

/**
 * проверка токенов при наличии access токена
 * запрос удачно обновил токены, запрос на обновление токенов не было
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      }),
  })
) as jest.Mock;

const trueResult = {
  status: { accessToken: "accessToken", refreshToken: "refreshToken" },
  message: "successToken",
};

describe("check utils", () => {
  it("check access token", async () => {
    const result = await updateTokens();

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
