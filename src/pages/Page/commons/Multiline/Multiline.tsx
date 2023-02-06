import React, { FC } from "react";

import useStyles from "./style";

const Multiline: FC<{ numberLine?: number }> = ({
  children,
  numberLine = 3,
}) => {
  const style = useStyles({ theme: { numberLine } });
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        className: `${child.props?.className} ${style.multilineEllipsis}`,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default Multiline;
