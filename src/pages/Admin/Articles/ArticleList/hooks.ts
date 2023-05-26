import { useCallback, useState } from "react";

import { t } from "i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useToggleModal } from "pages/Admin/components/AdminModal/hooks";
import { ArticleI } from "pages/interface";

import { deletedArticle as deletedArticleRequest } from "./api";

export const useArticleModal = ({
  setArticles,
  articles,
}: {
  setArticles: React.Dispatch<React.SetStateAction<ArticleI[]>>;
  articles: ArticleI[];
}) => {
  const { push } = useRouter();
  const { toggleModal, closeModal, openModal } = useToggleModal();
  const [deletedArticle, setDeletedArticle] = useState<ArticleI | null>(null);

  const handleOpenModal = useCallback(
    (article: ArticleI) => {
      openModal();
      setDeletedArticle(article);
    },
    [openModal]
  );

  const handleCloseModal = useCallback(() => {
    closeModal();
    setDeletedArticle(null);
  }, [closeModal]);

  const handleDeletedArticle = useCallback(() => {
    deletedArticleRequest(deletedArticle._id).then((result) => {
      const successMessage = "successDeleteArticle";
      toast(t(result.status ? successMessage : result.message), {
        type: result.status ? "success" : "error",
        hideProgressBar: true,
        theme: "colored",
      });

      if (result.redirectTo) {
        push(result.redirectTo);
      }

      if (result.status) {
        setArticles(articles.filter((item) => item._id !== deletedArticle._id));
      }

      handleCloseModal();
    });
  }, [articles, deletedArticle?._id, handleCloseModal, push, setArticles]);

  return {
    toggleModal,
    handleOpenModal,
    handleCloseModal,
    handleDeletedArticle,
    deletedArticle,
  };
};
