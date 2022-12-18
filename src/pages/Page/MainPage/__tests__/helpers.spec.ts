import { findImage } from "../helpers";

const initData = [
  {
    size: 1,
    file: "file1",
  },
  {
    size: 2,
    file: "file2",
  },
];

describe("helpers", () => {
  it("findImage", () => {
    const result = findImage({
      images: initData,
      findSize: 2,
    });

    expect(result).toBe("file2");
  });
});
