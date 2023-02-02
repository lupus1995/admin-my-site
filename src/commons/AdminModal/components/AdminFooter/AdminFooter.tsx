import React, { FC } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import useUtilsStyles from "utils/styles";

const AdminFooter: FC<{
  handleCallback: () => void;
  handleClose: () => void;
}> = ({ handleCallback, handleClose }) => {
  const { t } = useTranslation();
  const utilsStyles = useUtilsStyles();
  return (
    <div>
      <button
        onClick={handleCallback}
        className={classNames(`${utilsStyles.button} ${utilsStyles.mr15}`)}
        type="button"
      >
        {t("delete")}
      </button>
      <button
        onClick={handleClose}
        className={classNames(`${utilsStyles.button}`)}
        type="button"
      >
        {t("cancel")}
      </button>
    </div>
  );
};

export default AdminFooter;
