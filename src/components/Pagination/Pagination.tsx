import React, { FC, useCallback, useEffect, useState } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useDisabled } from "pages/Admin/hooks";
import useUtilsStyles from "utils/styles";

import useStyle from "./style";

interface PaginationResponse<T = unknown[]> {
  handleLoad: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => Promise<T>;
  limit: number;
  // управление выводом кнопки, если не нужно выводить вообще
  notVisibleButton?: boolean;
}

const Pagination: FC<PaginationResponse> = ({
  handleLoad,
  limit,
  notVisibleButton = false,
}) => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState<number>(0);
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const [isFirstLoadData, setIsFirstLoadData] = useState<boolean>(false);
  const { isDisabled, disabledClass, setIsDisabled } = useDisabled();

  const styles = useStyle();
  const utilStyles = useUtilsStyles();

  const handleClick = useCallback(() => {
    setIsDisabled(true);
    handleLoad({ offset, limit }).then((data) => {
      setIsDisabled(false);
      if (data.length === limit) {
        setOffset(offset + 1);
        setVisibleButton(true);
        return;
      }

      setVisibleButton(false);
    });
  }, [limit, handleLoad, offset, setIsDisabled]);

  useEffect(() => {
    if (!isFirstLoadData) {
      handleClick();
      setIsFirstLoadData(true);
    }
  }, [limit, handleClick, handleLoad, isFirstLoadData, offset]);

  return (
    <>
      {visibleButton && !notVisibleButton && (
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
