import React, { FC, ReactNode } from "react";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const WrapperCss: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export default WrapperCss;
