import React, { createElement, FC } from "react";

import useStyle from "./style";

type HeadingType = "h1" | "h3";

const Tag: FC<{ type: HeadingType; classes: unknown }> = ({
  type,
  children,
  classes,
}) => {
  const styles = useStyle();
  return createElement(
    type,
    { className: `${styles[type]}, ${classes}` },
    children
  );
};

const Heading: FC<{ type: HeadingType; classes?: unknown }> = ({
  children,
  type,
  classes,
}) => {
  return (
    <Tag type={type} classes={classes}>
      {children}
    </Tag>
  );
};

export default Heading;
