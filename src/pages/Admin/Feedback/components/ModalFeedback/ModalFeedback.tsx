import React, { FC, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminModal from "commons/AdminModal";
import FormRow from "commons/FormRow";
import { useDisabled } from "pages/Admin/hooks";
import { ResponseI } from "utils/interfaces";
import useUtilsStyles from "utils/styles";

import { deleteFeedback } from "../../api";
import { ModalFeedbackI } from "./interface";

const ModalFeedback: FC<ModalFeedbackI> = ({
  selected,
  handleClearFeedback,
}) => {
  const { t } = useTranslation();
  const utilsStyles = useUtilsStyles();
  const navigate = useNavigate();
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
          navigate(response.redirectTo);
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
