import { useEffect, useState } from "react";

import { useIsMediaQuery } from "utils/mediaQuery";

import { SIZES_FOR_FILES } from "./constants";
import { fetchImageUrl } from "./helpers";
import { ImageNameWidthI } from "./interface";

export const useImageName = ({ imageName }: ImageNameWidthI) => {
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();
  const [sizes, setSizes] = useState<{
    is360: string;
    is481: string;
    is721: string;
    is1081: string;
    is1367: string;
    is1921: string;
    "IS_360@2x": string;
    "IS_481@2x": string;
    "IS_721@2x": string;
    "IS_1081@2x": string;
    "IS_1367@2x": string;
    "IS_1921@2x": string;
  }>({
    is360: "",
    is481: "",
    is721: "",
    is1081: "",
    is1367: "",
    is1921: "",
    "IS_360@2x": "",
    "IS_481@2x": "",
    "IS_721@2x": "",
    "IS_1081@2x": "",
    "IS_1367@2x": "",
    "IS_1921@2x": "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (isMinDevicePixelRatio) {
      if (is1921) {
        let url = sizes["IS_1921@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_1921@2X"],
          });
          setSizes({
            ...sizes,
            "IS_1921@2x": url,
          });
        }

        setImageUrl(url);

        return;
      }

      if (is1367) {
        let url = sizes["IS_1367@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_1367@2X"],
          });
          setSizes({
            ...sizes,
            "IS_1367@2x": url,
          });
        }

        setImageUrl(url);

        return;
      }

      if (is1081) {
        let url = sizes["IS_1081@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_1081@2X"],
          });
          setSizes({
            ...sizes,
            "IS_1081@2x": url,
          });
        }

        setImageUrl(url);

        return;
      }

      if (is721) {
        let url = sizes["IS_721@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_721@2X"],
          });
          setSizes({
            ...sizes,
            "IS_721@2x": url,
          });
        }

        setImageUrl(url);

        return;
      }

      if (is481) {
        let url = sizes["IS_481@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_481@2X"],
          });
          setSizes({
            ...sizes,
            "IS_481@2x": url,
          });
        }

        setImageUrl(url);

        return;
      }

      if (is360) {
        let url = sizes["IS_360@2x"];
        if (!url) {
          url = fetchImageUrl({
            imageName,
            size: SIZES_FOR_FILES["IS_360@2X"],
          });
          setSizes({
            ...sizes,
            "IS_360@2x": url,
          });
        }

        setImageUrl(url);
        return;
      }
    }

    if (is1921) {
      let url = sizes.is1921;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_1921,
        });
        setSizes({
          ...sizes,
          is1921: url,
        });
      }

      setImageUrl(url);
      return;
    }

    if (is1367) {
      let url = sizes.is1367;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_1367,
        });
        setSizes({
          ...sizes,
          is1367: url,
        });
      }

      setImageUrl(url);
      return;
    }

    if (is1081) {
      let url = sizes.is1081;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_1081,
        });
        setSizes({
          ...sizes,
          is1081: url,
        });
      }

      setImageUrl(url);
      return;
    }

    if (is721) {
      let url = sizes.is721;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_721,
        });
        setSizes({
          ...sizes,
          is721: url,
        });
      }

      setImageUrl(url);
      return;
    }

    if (is481) {
      let url = sizes.is481;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_481,
        });
        setSizes({
          ...sizes,
          is481: url,
        });
      }

      setImageUrl(url);
      return;
    }

    if (is360) {
      let url = sizes.is360;
      if (!url) {
        url = fetchImageUrl({
          imageName,
          size: SIZES_FOR_FILES.IS_360,
        });
        setSizes({
          ...sizes,
          is360: url,
        });
      }

      setImageUrl(url);
      return;
    }

    setImageUrl("");
  }, [
    imageName,
    is1081,
    is1367,
    is1921,
    is360,
    is481,
    is721,
    isMinDevicePixelRatio,
    sizes,
  ]);

  return { imageUrl };
};
