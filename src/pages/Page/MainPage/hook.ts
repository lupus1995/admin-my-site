import { useMemo, useEffect, useState } from "react";

import { useIsMediaQuery } from "utils/mediaQuery";

import { getImages } from "./api";
import { SIZES_FOR_FILES } from "./constants";
import { findImage } from "./helpers";
import { ImageI } from "./interface";

export const useImages = ({ imageName }: { imageName: string }) => {
  const [images, setImages] = useState<ImageI[]>([]);
  const { is360, is481, is721, is1081, is1367, is1921, isMinDevicePixelRatio } =
    useIsMediaQuery();

  const imageUrl = useMemo(() => {
    if (isMinDevicePixelRatio) {
      if (is1921) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1921@2X"] });
      }

      if (is1367) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1367@2X"] });
      }

      if (is1081) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_1081@2X"] });
      }

      if (is721) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_721@2X"] });
      }

      if (is481) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_481@2X"] });
      }

      if (is360) {
        return findImage({ images, findSize: SIZES_FOR_FILES["IS_360@2X"] });
      }
    }

    if (is1921) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1921 });
    }

    if (is1367) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1367 });
    }

    if (is1081) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_1081 });
    }

    if (is721) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_721 });
    }

    if (is481) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_481 });
    }

    if (is360) {
      return findImage({ images, findSize: SIZES_FOR_FILES.IS_360 });
    }

    return "";
  }, [
    images,
    is1081,
    is1367,
    is1921,
    is360,
    is481,
    is721,
    isMinDevicePixelRatio,
  ]);

  useEffect(() => {
    getImages({ imageName }).then(({ status, responseBody }) => {
      if (status) {
        setImages(responseBody);
      }
    });
  }, [imageName]);

  return imageUrl;
};
