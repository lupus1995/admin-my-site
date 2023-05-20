import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { ArticleI } from "pages/interface";

import { getNewArticles } from "./api";

export const useInitArticles = () => {
  const [articles, setArticles] = useState<ArticleI[]>([]);
  const [visibleSkeleton, setVisibleSkeleton] = useState<boolean>(false);

  useEffect(() => {
    setVisibleSkeleton(true);
    getNewArticles({
      message: "errorDataMessage",
    })
      .then((newArticlesResponse) => {
        if (!newArticlesResponse.status) {
          toast(newArticlesResponse.message, {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          return;
        }

        if (newArticlesResponse.responseBody) {
          setArticles(newArticlesResponse.responseBody);
        }
      })
      .finally(() => setVisibleSkeleton(false));
  }, []);

  return { articles, visibleSkeleton };
};
