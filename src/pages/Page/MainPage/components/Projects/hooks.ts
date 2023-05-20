import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { ProjectI } from "pages/interface";

import { getProjects } from "./api";

export const useInitProjects = () => {
  const [projects, setProjects] = useState<ProjectI[]>([]);
  const [visibleSkeleton, setVisibleSkeleton] = useState<boolean>(false);

  useEffect(() => {
    setVisibleSkeleton(true);
    getProjects({
      message: "errorDataMessage",
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
  }, []);

  return { projects, visibleSkeleton };
};
