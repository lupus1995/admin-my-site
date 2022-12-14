import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Dashboard from "commons/Dashboard";
import FormRow from "commons/FormRow";
import Title from "commons/Title";
import useUtilsStyles from "utils/styles";

import { useSession } from "../hooks";
import { getFeedback } from "./api";
import { FeedbackTable, ModalFeedback } from "./components";
import { FeedbackI } from "./interface";

const Feedback = () => {
  useSession();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const utilsStyles = useUtilsStyles();
  const [feedback, setFeedback] = useState<FeedbackI[]>([]);
  const [selected, setSelected] = useState<FeedbackI[]>([]);

  const handleClearFeedback = () => {
    const deletedFeedback = selected.map((item) => item._id);
    setFeedback(feedback.filter((item) => !deletedFeedback.includes(item._id)));
    setSelected([]);
  };

  useEffect(() => {
    getFeedback().then((result) => {
      if (!result.status) {
        toast(t(result.message), {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        navigate(result.redirectTo);
      }

      if (result.responseBody) {
        setFeedback(result.responseBody);
      }
    });
  }, [navigate, t]);

  return (
    <Dashboard>
      <div className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn}`}>
        <FormRow>
          <Title title={t("feedback")} />
        </FormRow>

        <FeedbackTable
          feedback={feedback}
          selected={selected}
          setSelected={setSelected}
        />

        <ModalFeedback
          selected={selected}
          handleClearFeedback={handleClearFeedback}
        />
      </div>
    </Dashboard>
  );
};

export default Feedback;
