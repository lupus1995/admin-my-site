import React, { FC } from "react";

import classNames from "classnames";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import useStyles from "../../style";

const AdminHeader: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const styles = useStyles();
  const utilsStyles = useUtilsStyles();
  const { t } = useLanguage();
  return (
    <div className={`${styles.modalHeaderContainer}`}>
      <h3>{t("deteleArticle")}</h3>
      <button
        className={classNames(`${utilsStyles.button}`)}
        type="button"
        onClick={handleClose}
      >
        х
      </button>
    </div>
  );
};

export default AdminHeader;
