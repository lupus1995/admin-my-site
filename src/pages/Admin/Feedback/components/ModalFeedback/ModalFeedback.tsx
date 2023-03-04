import React, { FC, useState } from "react";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import FormRow from "pages/Admin/commons/FormRow";
import AdminModal from "pages/Admin/components/AdminModal";
import { useDisabled } from "pages/Admin/hooks";
import { ResponseI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";

import { ModalFeedbackI } from "./interface";
import { deleteFeedback } from "../../api";

const ModalFeedback: FC<ModalFeedbackI> = ({
  selected,
  handleClearFeedback,
}) => {
  const { t } = useTranslation();
  const utilsStyles = useUtilsStyles();
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const { setIsDisabled } = useDisabled();

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);
  const handleDeleteFeedback = () => {
    setIsDisabled(true);
    deleteFeedback({ ids: selected.map((item) => item._id) })
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
      .finally(() => {
        setIsDisabled(false);
        handleClearFeedback();
        handleCloseModal();
      });
  };

  return (
    <>
      {selected.length > 0 && (
        <FormRow>
          <button
            onClick={handleOpenModal}
            className={`${utilsStyles.button}`}
            type="button"
          >
            {t("feedbackModalTitle")}
          </button>
        </FormRow>
      )}

      <AdminModal
        handleClose={handleCloseModal}
        handleCallback={handleDeleteFeedback}
        open={open}
      >
        <p>{t("feedbackModalSubtitle")}</p>
      </AdminModal>
    </>
  );
};

export default ModalFeedback;
