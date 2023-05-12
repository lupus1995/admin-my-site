import React from "react";

import Head from "next/head";

import { hasWindow } from "utils/helpers";

const env = process.env.NODE_ENV;

const YandexMetrics = () => {
  const visibleYandexMetrics =
    env === "production" &&
    hasWindow() &&
    window?.location.origin === "https://webforself.ru";

  return (
    <>
      {visibleYandexMetrics && (
        <meta name="yandex-verification" content="1b8ba196c8180663" />
      )}
    </>
  );
};

export default YandexMetrics;
