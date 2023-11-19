import React, { FC, ReactNode } from "react";

import injectSheet from "react-jss";

import { useStylesTag } from "utils/stylesPage";

const WrapperStyles: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export default injectSheet(useStylesTag, { link: true })(WrapperStyles);
