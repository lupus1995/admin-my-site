import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { ProjectI } from "pages/interface";
import { useLanguage } from "utils/hooks";

import { getProjects } from "./api";

export const useInitProjects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectI[]>([]);
  const [visibleSkeleton, setVisibleSkeleton] = useState<boolean>(false);

  useEffect(() => {
    setVisibleSkeleton(true);
    getProjects({
      message: t("errorDataMessage"),
    })
      .then((response) => {
        if (!response.status) {
          toast(response.message, {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          return;
        }

        if (response.responseBody) {
          setProjects(response.responseBody);
        }
      })
      .finally(() => setVisibleSkeleton(false));
  }, [t]);

  return { projects, visibleSkeleton };
};
