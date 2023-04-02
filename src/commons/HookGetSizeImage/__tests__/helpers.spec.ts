import { URL } from "utils/constants";

import { fetchImageUrl } from "../helpers";

describe("helpers", () => {
  it("findImage", () => {
    const result = fetchImageUrl({
      imageName: "image.png",
      size: 510,
    });

    expect(result).toBe(`${URL}/main-page/510/image.png`);
  });
});
