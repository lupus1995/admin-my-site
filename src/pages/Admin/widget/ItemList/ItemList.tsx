import React, { FC } from "react";

import { ItemPropsI } from "./interface";
import useStyles from "./style";
import FormRow from "../../commons/FormRow";

const ItemList: FC<ItemPropsI> = ({ src, title, description }) => {
  const style = useStyles();

  return (
    <FormRow>
      <img
        data-testid={src}
        className={style.thumbnail}
        src={src}
        // @ts-ignore+
        alt={title}
      />
      <h3 className="title">
        {/* @ts-ignore */}
        {title}
      </h3>
      <span className="description">
        {/* @ts-ignore */}
        {description}
      </span>
    </FormRow>
  );
};

export default ItemList;
