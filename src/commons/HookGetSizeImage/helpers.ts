import { URL } from "utils/constants";

import { SIZES_FOR_FILES } from "./constants";
import { IMAGE_SIZE_ENUM } from "./enums";
import { ImageMediaQueryI, ImageSizeI } from "./interface";

// поиск необходимой картинки под нужный размер
const fetchImageUrl = ({
  imageName, // имя картинки
  size, // искомый размер,
}: {
  imageName: string;
  size: number;
}): string => {
  return `${URL}/main-page/${size}/${imageName}`;
};

// получение ссылки на картинку в зависимости от ее размера
export const getUrlImage = ({
  sizes,
  size,
  imageName,
}: {
  sizes: ImageSizeI;
  size: IMAGE_SIZE_ENUM;
  imageName: string;
}) => {
  let url = sizes[size];
  if (!url) {
    url = fetchImageUrl({
      imageName,
      size: SIZES_FOR_FILES[size],
    });
  }

  return url;
};

// получение данных о размере картинок в зависимости от ширины окна браузера
export const getSizeImage = ({
  is360,
  is481,
  is721,
  is1081,
  is1367,
  is1921,
  isMinDevicePixelRatio,
}: ImageMediaQueryI) => {
  if (is1921) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_1921@2X"]
      : IMAGE_SIZE_ENUM.IS_1921;
  }

  if (is1367) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_1367@2X"]
      : IMAGE_SIZE_ENUM.IS_1367;
  }

  if (is1081) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_1081@2X"]
      : IMAGE_SIZE_ENUM.IS_1081;
  }

  if (is721) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_721@2X"]
      : IMAGE_SIZE_ENUM.IS_721;
  }

  if (is481) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_481@2X"]
      : IMAGE_SIZE_ENUM.IS_481;
  }

  if (is360) {
    return isMinDevicePixelRatio
      ? IMAGE_SIZE_ENUM["IS_360@2X"]
      : IMAGE_SIZE_ENUM.IS_360;
  }

  return null;
};
