import { useEffect, useState } from "react";

import { useIsMediaQuery } from "utils/mediaQuery";

import { INIT_SIZES } from "./constants";
import { getUrlImage, getSizeImage } from "./helpers";
import { ImageNameWidthI, ImageSizeI } from "./interface";

export const useImageName = ({ imageName }: ImageNameWidthI) => {
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();
  const [sizes, setSizes] = useState<ImageSizeI>(INIT_SIZES);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const size = getSizeImage({
      is360,
      is481,
      is721,
      is1081,
      is1367,
      is1921,
      isMinDevicePixelRatio,
    });

    const url = getUrlImage({
      sizes,
      size,
      imageName,
    });

    if (!url) {
      setSizes({
        ...sizes,
        [size]: url,
      });
    }

    setImageUrl(url);
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

  if (!imageName) {
    return { imageUrl: undefined };
  }

  return { imageUrl };
};
