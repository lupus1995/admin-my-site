import { prepareDate } from "../helpers";

describe("prepareDate", () => {
  it("check prepare date", () => {
    const result = prepareDate("2022-12-20T00:00:00.000+00:00");

    expect(result).toBeInstanceOf(Date);
  });
});
