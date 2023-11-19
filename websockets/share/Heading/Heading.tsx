import React, { createElement, FC, ReactNode } from "react";

import useStyle from "./style";

type HeadingType = "h1" | "h3";

const Tag: FC<{ type: HeadingType; classes: unknown; children: ReactNode }> = ({
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

const Heading: FC<{
  type: HeadingType;
  classes?: unknown;
  children: ReactNode;
}> = ({ children, type, classes }) => {
  return (
    <Tag type={type} classes={classes}>
      {children}
    </Tag>
  );
};

export default Heading;
