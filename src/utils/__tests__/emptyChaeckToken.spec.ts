import { checkToken } from "../apiTokens";

/**
 * проверка токенов если их нет
 */
jest.mock("local-storage", () => {
  const module = jest.requireActual("local-storage");

  return {
    ...module,
    get: jest
      .fn()
      .mockImplementation(() => null)
      .mockImplementation(() => null),
    set: jest.fn,
  };
});

const trueResult = {
  status: false,
  message: "errorToken",
  redirectTo: "/signin",
};

describe("check utils", () => {
  it("empty token", async () => {
    const result = await checkToken();

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
