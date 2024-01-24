import React, { FC } from "react";

import Head from "next/head";

import { get } from "pages/Page/MainPage/api";
import { MainPagePropsI } from "pages/Page/MainPage/interface";

import MainPage from "../src/pages/Page/MainPage";

export async function getServerSideProps(): Promise<{
  props: MainPagePropsI;
}> {
  const dataResponse = await get({ message: "errorDataMessage" });

  return {
    props: {
      dataResponse,
    },
  };
}

const Index: FC<MainPagePropsI> = ({ dataResponse }) => {
  return (
    <>
      <Head>
        <title>WEB FOR SELF</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
        />
      </Head>
      <MainPage dataResponse={dataResponse} />
    </>
  );
};

export default Index;
