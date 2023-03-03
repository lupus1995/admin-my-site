import React, { FC } from "react";
import injectSheet from "react-jss";
import { useStylesTag } from "utils/stylesPage";

const WrapperStyles: FC = ({ children }) => <>{children}</>;

export default injectSheet(useStylesTag)(WrapperStyles)