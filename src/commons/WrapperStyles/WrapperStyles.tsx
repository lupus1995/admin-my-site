import React, { FC, ReactNode } from "react";

import injectSheet from "react-jss";

import { stylesTag } from "utils/stylesPage";

const WrapperStyles: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export default injectSheet(stylesTag, { link: true })(WrapperStyles);
