import React, { FC, useState } from "react";

import classNames from "classnames";
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
  const utilsStyles = useUtilsStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { disabledClass, setIsDisabled, isDisabled } = useDisabled();

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);
  const handleDeleteFeedback = () => {
    setIsDisabled(true);
    deleteFeedback({ ids: selected.map((item) => item._id) })
      .then((response: ResponseI) => {
        toast(response.message, {
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
            Удалить выделенные записи с обратной связью?
          </button>
        </FormRow>
      )}

      <AdminModal open={open}>
        <div className={`${utilsStyles.modalHeaderContainer}`}>
          <h3>Удалить выделнные записи с обратной связью?</h3>
          <button
            className={classNames(`${utilsStyles.button}`)}
            type="button"
            onClick={handleCloseModal}
          >
            х
          </button>
        </div>

        <div className={`${utilsStyles.modalContent}`}>
          <p>
            Вы действительно намерены удалить статью выделнные записи с обратной
            связью?
          </p>
        </div>
        <div>
          <button
            onClick={handleDeleteFeedback}
            className={classNames(`${utilsStyles.button} ${utilsStyles.mr15}`, {
              [disabledClass]: isDisabled,
            })}
            type="button"
          >
            Удалить
          </button>
          <button
            onClick={handleCloseModal}
            className={classNames(`${utilsStyles.button}`, {
              [disabledClass]: isDisabled,
            })}
            type="button"
          >
            Отмена
          </button>
        </div>
      </AdminModal>
    </>
  );
};

export default ModalFeedback;
