import { useMediaQuery } from "react-responsive";

export interface MediaQueryI {
  theme: {
    is360?: boolean;
    is481?: boolean;
    is721?: boolean;
    is1081?: boolean;
    is1367?: boolean;
    is1921?: boolean;

    isMin1367AndMax1920?: boolean;
    isMin1081AndMax1366?: boolean;
    isMin721AndMax1080?: boolean;
    isMin1600AndMax1920?: boolean;
    isMin1367AndMax1600?: boolean;

    isMinDevicePixelRatio?: boolean;
  };
}

export const useIsMediaQuery = () => {
  const is360 = useMediaQuery({ query: "(min-width: 360px)" });
  const is481 = useMediaQuery({ query: "(min-width: 481px)" });
  const is721 = useMediaQuery({ query: "(min-width: 721px)" });
  const is1081 = useMediaQuery({ query: "(min-width: 1081px)" });
  const is1367 = useMediaQuery({ query: "(min-width: 1367px)" });
  const is1601 = useMediaQuery({ query: "(min-width: 1601px)" });
  const is1921 = useMediaQuery({ query: "(min-width: 1921px)" });

  const isMin1600AndMax1920 = useMediaQuery({
    query: "(min-width: 1601px) and (max-width: 1920px)",
  });
  const isMin1367AndMax1600 = useMediaQuery({
    query: "(min-width: 1367px) and (max-width: 1600px)",
  });
  const isMin1367AndMax1920 = isMin1600AndMax1920 || isMin1367AndMax1600;
  const isMin1081AndMax1366 = useMediaQuery({
    query: "(min-width: 1081px) and (max-width: 1366px)",
  });
  const isMin721AndMax1080 = useMediaQuery({
    query: "(min-width: 721px) and (max-width: 1080px)",
  });

  const isMinDevicePixelRatio = useMediaQuery({
    query:
      "only screen and (-moz-min-device-pixel-ratio: 2)," +
      "only screen and (-o-min-device-pixel-ratio: 2/1)," +
      "only screen and (-webkit-min-device-pixel-ratio: 2)," +
      "only screen and (min-device-pixel-ratio: 2)",
  });

  return {
    is360,
    is481,
    is721,
    is1081,
    is1367,
    is1601,
    is1921,

    isMin1367AndMax1600,
    isMin1600AndMax1920,
    isMin1367AndMax1920,
    isMin1081AndMax1366,
    isMin721AndMax1080,

    isMinDevicePixelRatio,
  };
};
