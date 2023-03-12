import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { getFeedback } from "./api";
import { FeedbackTable, ModalFeedback } from "./components";
import { FeedbackI } from "./interface";
import { Title, FormRow } from "../commons";
import { Dashboard } from "../components";
import { useSession } from "../hooks";

const Feedback = () => {
  useSession();
  const { t } = useLanguage();
  const { push } = useRouter();
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

        push(result.redirectTo);
      }

      if (result.responseBody) {
        setFeedback(result.responseBody);
      }
    });
  }, [push, t]);

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
