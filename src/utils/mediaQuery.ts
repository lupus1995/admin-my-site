import { useMediaQuery } from "react-responsive";

export interface MediaQueryI {
  theme: {
    is360?: boolean;
    is481?: boolean;
    is721?: boolean;
    is1081?: boolean;
    is1367?: boolean;
    is1921?: boolean;
    isMinDevicePixelRatio?: boolean;
  };
}

export const useIsMediaQuery = () => {
  const is360 = useMediaQuery({ query: "(min-width: 360px)" });
  const is481 = useMediaQuery({ query: "(min-width: 481px)" });
  const is721 = useMediaQuery({ query: "(min-width: 721px)" });
  const is1081 = useMediaQuery({ query: "(min-width: 1081px)" });
  const is1367 = useMediaQuery({ query: "(min-width: 1367px)" });
  const is1921 = useMediaQuery({ query: "(min-width: 1921px)" });

  const isMinDevicePixelRatio = useMediaQuery({
    query: "(min-device-pixel-ratio: 2)",
  });

  return {
    is360,
    is481,
    is721,
    is1081,
    is1367,
    is1921,
    isMinDevicePixelRatio,
  };
};
