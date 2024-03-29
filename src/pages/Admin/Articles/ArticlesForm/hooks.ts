import { useCallback, useEffect, useState } from "react";

import { format } from "date-fns";
import { useRouter } from "next/router";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

import { useFetchUploadImage } from "entities/articles";
import { ArticleI } from "pages/interface";
import { useAppDispatch } from "store/hooks";
import { URL } from "utils/constants";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";

import { getArticle, saveArticle } from "./api";

export const useSaveArticle = ({
  setIsDisabled,
}: {
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const { push } = useRouter();

  const onSubmit = (data: ArticleI) => {
    setIsDisabled(true);
    dispatch(saveArticle(data))
      .then((response: ResponseI) => {
        toast(t(response.message), {
          type: response.status ? "success" : "error",
          hideProgressBar: true,
          theme: "colored",
        });

        if (response.redirectTo) {
          push(response.redirectTo);
        }
      })
      .finally(() => setIsDisabled(false));
  };

  return onSubmit;
};

// инициализация данных для формы статьи
export const useInitFormArticle = ({
  register,
  setValue,
}: {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const [isInitForm, setIsInitForm] = useState<boolean>(false);
  const router = useRouter();
  const { push, query } = router;

  const { id } = query || { id: null };

  useEffect(() => {
    if (!isInitForm) {
      register("title.ru", { required: t("requiredText") });
      register("title.en", { required: t("requiredText") });
      register("description.ru", { required: t("requiredText") });
      register("description.en", { required: t("requiredText") });
      register("text.ru", { required: t("requiredText") });
      register("text.en", { required: t("requiredText") });
      register("keyWords.ru", { required: t("requiredText") });
      register("keyWords.en", { required: t("requiredText") });
      register("publishedAt", { required: t("requiredText") });
      register("createdAt");
      register("updatedAt");
      register("hidePublishedArticle");

      if (typeof id === "string") {
        dispatch(getArticle({ id }))
          .then((result) => {
            if (!result.status) {
              toast(t(result.message), {
                type: "error",
                hideProgressBar: true,
                theme: "colored",
              });

              push(result.redirectTo);
            }

            if (result.responseBody) {
              Object.entries(result.responseBody).forEach(
                ([key, value]: [string, string]) => {
                  setValue(key, value);
                }
              );
            }
          })
          .finally(() => setIsInitForm(true));
      } else {
        setValue("text.ru", "");
        setValue("text.en", "");
        setValue("createdAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("updatedAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("hidePublishedArticle", false);
        setIsInitForm(true);
      }
    }
  }, [dispatch, id, isInitForm, push, register, setValue, t]);

  return isInitForm;
};

export const useUploadImage = (id: string) => {
  const { fetchUnploadImage } = useFetchUploadImage();
  const handleUploadImage = useCallback(
    (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        fetchUnploadImage({ body: formData, id })
          .then(({ data: { path } }: { data: { path: string } }) => {
            resolve(`${URL}/${path}`);
          })
          .catch(() => {
            reject("Upload failed");
          });
      });
    },
    [fetchUnploadImage, id]
  );

  return { handleUploadImage };
};
