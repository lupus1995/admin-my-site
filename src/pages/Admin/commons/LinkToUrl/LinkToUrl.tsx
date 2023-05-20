import React, { FC } from "react";

import classNames from "classnames";
import { useRouter } from "next/router";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { LinkToUrlPropsI } from "./interface";

const LinkToUrl: FC<LinkToUrlPropsI> = ({ isDisabled, disabledClass, url }) => {
  const { t } = useLanguage();
  const { push } = useRouter();
  const utilsStyles = useUtilsStyles();

  const handleClick = () => push(url);

  return (
    <button
      className={classNames(`${utilsStyles.button}`, {
        [disabledClass]: isDisabled,
      })}
      type="button"
      onClick={handleClick}
    >
      {t("return")}
    </button>
  );
};

export default LinkToUrl;
