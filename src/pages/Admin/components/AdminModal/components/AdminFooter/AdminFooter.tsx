import React, { FC } from "react";

import classNames from "classnames";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

const AdminFooter: FC<{
  handleCallback: () => void;
  handleClose: () => void;
}> = ({ handleCallback, handleClose }) => {
  const { t } = useLanguage();
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
