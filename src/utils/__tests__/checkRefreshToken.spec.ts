import { when } from "jest-when";

import { updateTokens } from "../apiTokens";

/**
 * проверка токенов при наличии refresh токена
 */
jest.mock("local-storage", () => {
  const module = jest.requireActual("local-storage");

  const getMock = jest.fn();

  when(getMock)
    .calledWith("accessToken")
    .mockReturnValue(null)
    .calledWith("refreshToken")
    .mockReturnValue("refreshToken");

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
  status: true,
  message: "successToken",
  redirectTo: "/signin",
};
describe("check utils", () => {
  it("check refresh token", async () => {
    const result = await updateTokens();

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
