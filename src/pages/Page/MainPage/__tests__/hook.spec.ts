import { renderHook, screen } from "@testing-library/react";

import { URL } from "utils/constants";

import { useImageName } from "../hook";
import { ImageNameWidthI } from "../interface";

describe("hook", () => {
  let props: ImageNameWidthI;
  beforeEach(() => {
    props = {
      imageName: "Image.png",
      is360: false,
      is481: false,
      is721: false,
      is1081: false,
      is1367: false,
      is1921: false,
      isMinDevicePixelRatio: false,
    };
  });

  describe("with min device pixel ratio", () => {
    beforeEach(() => {
      props = {
        ...props,
        isMinDevicePixelRatio: true,
      };
    });

    it("check render 360", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is360: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/960/Image.png`);
    });

    it("check render 481", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is481: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/1440/Image.png`);
    });

    it("check render 721", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is721: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/2160/Image.png`);
    });

    it("check render 1081", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1081: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/2732/Image.png`);
    });

    it("check render 1367", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1367: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/3840/Image.png`);
    });

    it("check render 1921", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1921: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/5120/Image.png`);
    });
  });

  describe("without min device pixel ratio", () => {
    beforeEach(() => {
      props = {
        ...props,
        isMinDevicePixelRatio: false,
      };
    });

    it("check render 360", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is360: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/480/Image.png`);
    });

    it("check render 481", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is481: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/720/Image.png`);
    });

    it("check render 721", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is721: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/1080/Image.png`);
    });

    it("check render 1081", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1081: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/1366/Image.png`);
    });

    it("check render 1367", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1367: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/1920/Image.png`);
    });

    it("check render 1921", () => {
      const { result } = renderHook(() =>
        useImageName({ ...props, is1921: true })
      );

      expect(result.current.imageUrl).toBe(`${URL}/main-page/2560/Image.png`);
    });
  });
});
