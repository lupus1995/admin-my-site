import React from "react";

import Head from "next/head";

import Chart from "../src/petProjects/Chart/Chart";

const ChartPage = () => (
  <>
    <Head>
      <title>Графики</title>
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/chart`}
      />
    </Head>
    <Chart />
  </>
);

export default ChartPage;
