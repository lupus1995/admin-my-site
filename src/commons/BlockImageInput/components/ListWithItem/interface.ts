import { ImageType } from "react-images-uploading";

export interface ListWithItemI {
  disabledClass: string;
  isDisabled: boolean;
  image: ImageType;
  label: string;
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  index: number;
}
