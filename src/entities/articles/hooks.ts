import { useUploadImageForArticleMutation } from "./service";

export const useFetchUploadImage = () => {
  const [fetchUnploadImage] = useUploadImageForArticleMutation();

  return { fetchUnploadImage };
};
