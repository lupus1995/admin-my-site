import React from "react";

import Head from "next/head";

import YandexMetrics from "commons/YandexMetrics";

import NotFoundPage from "../src/pages/Page/404Page";

const Index = () => {
  return (
    <>
      <Head>
        <YandexMetrics />
      </Head>
      <NotFoundPage />
    </>
  );
};

export default Index;
