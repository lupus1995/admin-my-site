import { useCallback, useEffect, useState } from "react";

import { format } from "date-fns";
import { useRouter } from "next/router";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

import { ProjectI } from "pages/interface";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";

import {
  getProject,
  saveProject,
  deletedProject as deletedProjectRequest,
} from "./api";
import { useToggleModal } from "../components/AdminModal/hooks";

export const useSaveProject = ({
  setIsDisabled,
}: {
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useLanguage();
  const { push } = useRouter();

  const onSubmit = (data: ProjectI) => {
    setIsDisabled(true);
    saveProject(data)
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

export const useInitFormProjects = ({
  register,
  setValue,
}: {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const { t } = useLanguage();
  const [isInitForm, setIsInitForm] = useState<boolean>(false);
  const {
    push,
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (!isInitForm) {
      register("title.ru", { required: t("requiredText") });
      register("title.en", { required: t("requiredText") });
      register("description.ru", { required: t("requiredText") });
      register("description.en", { required: t("requiredText") });
      register("keyWords.ru", { required: t("requiredText") });
      register("keyWords.en", { required: t("requiredText") });
      register("publishedAt", { required: t("requiredText") });
      register("createdAt");
      register("updatedAt");
      register("hidePublished");

      if (typeof id === "string") {
        getProject({ id })
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
        setValue("createdAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("updatedAt", format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        setValue("hidePublished", false);
        setIsInitForm(true);
      }
    }
  }, [id, isInitForm, push, register, setValue, t]);

  return isInitForm;
};

export const useProjectModal = ({
  projects,
  setProjects,
}: {
  projects: ProjectI[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectI[]>>;
}) => {
  const { t } = useLanguage();
  const { push } = useRouter();
  const { toggleModal, closeModal, openModal } = useToggleModal();
  const [deletedProject, setDeletedProject] = useState<ProjectI | null>(null);

  const handleOpenModal = useCallback(
    (article: ProjectI) => {
      openModal();
      setDeletedProject(article);
    },
    [openModal]
  );

  const handleCloseModal = useCallback(() => {
    closeModal();
    setDeletedProject(null);
  }, [closeModal]);

  const handleDeletedProject = useCallback(() => {
    deletedProjectRequest(deletedProject._id).then((result) => {
      const successMessage = "successDeleteProject";
      toast(t(result.status ? successMessage : result.message), {
        type: result.status ? "success" : "error",
        hideProgressBar: true,
        theme: "colored",
      });

      if (result.redirectTo) {
        push(result.redirectTo);
      }

      if (result.status) {
        setProjects(projects.filter((item) => item._id !== deletedProject._id));
      }

      handleCloseModal();
    });
  }, [deletedProject?._id, handleCloseModal, projects, push, setProjects, t]);

  return {
    toggleModal,
    handleOpenModal,
    handleCloseModal,
    handleDeletedProject,
    deletedProject,
  };
};
