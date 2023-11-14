import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";

import useStyles from "./style";

const Multiline: FC<{ numberLine?: number; children: ReactNode }> = ({
  children,
  numberLine = 3,
}) => {
  const style = useStyles({ theme: { numberLine } });
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        className: `${child.props?.className} ${style.multilineEllipsis}`,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default Multiline;
