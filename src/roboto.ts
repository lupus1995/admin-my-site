import { createUseStyles } from "react-jss";

import RobotoBoldWoff from "./font/Roboto-Bold.woff";
import RobotoBoldWoff2 from "./font/Roboto-Bold.woff2";
import RobotoLightWoff from "./font/Roboto-Light.woff";
import RobotoLightWoff2 from "./font/Roboto-Light.woff2";
import RobotoMediumWoff from "./font/Roboto-Medium.woff";
import RobotoMediumWoff2 from "./font/Roboto-Medium.woff2";
import RobotoThinWoff from "./font/Roboto-Thin.woff";
import RobotoThinWoff2 from "./font/Roboto-Thin.woff2";

const useStyles = createUseStyles({
  "@font-face": [
    {
      fontFamily: "Roboto",
      fontStyle: "normal",  
      fontWeight: 700,      
      fontDisplay: "swap",
      src: `url("${RobotoBoldWoff2}") format("woff2"),
        url("${RobotoBoldWoff}") format("woff")`,
    },
    {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 300,
      fontDisplay: "swap",
      src: `url("${RobotoLightWoff2}") format("woff2"),
          url("${RobotoLightWoff}") format("woff")`,
    },
    {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontDisplay: "swap",
      src: `url("${RobotoMediumWoff2}") format("woff2"),
          url("${RobotoMediumWoff}") format("woff")`,
    },
    {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 100,
      fontDisplay: "swap",
      src: `
          url("${RobotoThinWoff2}") format("woff2"),
          url("${RobotoThinWoff}") format("woff")`,
    },
  ],
});

export default useStyles;
