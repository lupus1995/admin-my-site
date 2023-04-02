import { URL } from "utils/constants";

// поиск необходимой картинки под нужный размер
export const fetchImageUrl = ({
  imageName, // имя картинки
  size, // искомый размер,
}: {
  imageName: string;
  size: number;
}): string => {
  return `${URL}/main-page/${size}/${imageName}`;
};
