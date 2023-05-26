import React, { FC } from "react";

import Link from "next/link";

import { useLanguage } from "utils/hooks";
import useUtilsStyles from "utils/styles";

import { ItemWrapperPropI } from "./interface";
import useStyles from "./style";

const ItemWrapper: FC<ItemWrapperPropI> = ({ children, href, handleClick }) => {
  const { t } = useLanguage();
  const style = useStyles();
  const utilsStyles = useUtilsStyles();

  return (
    <article className={style.item}>
      {children}
      <div style={{ marginTop: "auto" }}>
        <Link
          className={`${utilsStyles.button} ${utilsStyles.mr15}`}
          href={href}
        >
          {t("edit")}
        </Link>
        <button
          onClick={handleClick}
          className={utilsStyles.button}
          type="button"
        >
          {t("delete")}
        </button>
      </div>
    </article>
  );
};

export default ItemWrapper;
