import React, { FC, useCallback } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useDisabled } from "pages/Admin/hooks";
import useUtilsStyles from "utils/styles";

import useStyle from "./style";

interface PaginationResponse {
  handleLoad: () => Promise<void>;
  // управление выводом кнопки, если не нужно выводить вообще
  notVisibleButton?: boolean;
}

const Pagination: FC<PaginationResponse> = ({
  handleLoad,
  notVisibleButton = false,
}) => {
  const { t } = useTranslation();
  const { isDisabled, disabledClass, setIsDisabled } = useDisabled();

  const styles = useStyle();
  const utilStyles = useUtilsStyles();

  const handleClick = useCallback(() => {
    setIsDisabled(true);
    handleLoad().then(() => {
      setIsDisabled(false);
    });
  }, [handleLoad, setIsDisabled]);

  return (
    <>
      {!notVisibleButton && (
        <div className={`${styles.pagination}`}>
          <button
            disabled={isDisabled}
            className={classNames(`${utilStyles.button}`, {
              [disabledClass]: isDisabled,
            })}
            onClick={handleClick}
            type="button"
          >
            {t("loadMoreArticle")}
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
