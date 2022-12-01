import { ImageI } from "./interface";

// поиск необходимой картинки под нужный размер
export const findImage = ({
  images, // массив картинок
  findSize, // искомый размер,
}: {
  images: ImageI[];
  findSize: number;
}): string => {
  return images.find(({ size }) => size === findSize)?.file || "";
};
