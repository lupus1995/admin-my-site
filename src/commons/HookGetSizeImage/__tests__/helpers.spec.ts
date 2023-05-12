import { URL } from "utils/constants";

import { INIT_SIZES, SIZES_FOR_FILES } from "../constants";
import { IMAGE_SIZE_ENUM } from "../enums";
import { getUrlImage, getSizeImage } from "../helpers";

const imageName = "testImage.png";
const initData = {
  is360: false,
  is481: false,
  is721: false,
  is1081: false,
  is1367: false,
  is1921: false,
  isMinDevicePixelRatio: false,
};

describe("helpers", () => {
  describe("getSizeImage", () => {
    describe("isMinDevicePixelRatio", () => {
      it("is1921", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is1921: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_1921@2X"]);
      });
      it("is1367", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is1367: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_1367@2X"]);
      });
      it("is1081", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is1081: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_1081@2X"]);
      });
      it("is721", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is721: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_721@2X"]);
      });
      it("is481", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is481: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_481@2X"]);
      });
      it("is360", () => {
        const result = getSizeImage({
          ...initData,
          isMinDevicePixelRatio: true,
          is360: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM["IS_360@2X"]);
      });
    });
    describe("isNotMinDevicePixelRatio", () => {
      it("is1921", () => {
        const result = getSizeImage({
          ...initData,
          is1921: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_1921);
      });
      it("is1367", () => {
        const result = getSizeImage({
          ...initData,
          is1367: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_1367);
      });
      it("is1081", () => {
        const result = getSizeImage({
          ...initData,
          is1081: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_1081);
      });
      it("is721", () => {
        const result = getSizeImage({
          ...initData,
          is721: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_721);
      });
      it("is481", () => {
        const result = getSizeImage({
          ...initData,
          is481: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_481);
      });
      it("is360", () => {
        const result = getSizeImage({
          ...initData,
          is360: true,
        });

        expect(result).toBe(IMAGE_SIZE_ENUM.IS_360);
      });
    });
  });
  describe("getUrlImage", () => {
    it("IS_360", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_360,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_360]
        }/${imageName}`
      );
    });
    it("IS_481", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_481,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_481]
        }/${imageName}`
      );
    });
    it("IS_721", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_721,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_721]
        }/${imageName}`
      );
    });
    it("IS_1081", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_1081,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_1081]
        }/${imageName}`
      );
    });
    it("IS_1367", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_1367,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_1367]
        }/${imageName}`
      );
    });
    it("IS_1921", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM.IS_1921,
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_1921]
        }/${imageName}`
      );
    });
    it("IS_360@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_360@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_360@2X"]]
        }/${imageName}`
      );
    });
    it("IS_481@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_481@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_481@2X"]]
        }/${imageName}`
      );
    });
    it("IS_721@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_721@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_721@2X"]]
        }/${imageName}`
      );
    });
    it("IS_1081@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_1081@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_1081@2X"]]
        }/${imageName}`
      );
    });
    it("IS_1367@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_1367@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_1367@2X"]]
        }/${imageName}`
      );
    });
    it("IS_1921@2X", () => {
      const result = getUrlImage({
        sizes: INIT_SIZES,
        size: IMAGE_SIZE_ENUM["IS_1921@2X"],
        imageName,
      });

      expect(result).toBe(
        `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM["IS_1921@2X"]]
        }/${imageName}`
      );
    });
  });
});
