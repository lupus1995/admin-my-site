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

describe("check utils", () => {
  it("empty token", async () => {
    const result = await checkToken();

    expect(result).toBeFalsy();
  });
});
