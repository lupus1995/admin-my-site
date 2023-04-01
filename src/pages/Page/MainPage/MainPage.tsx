import React, { FC, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";
import { toast } from "react-toastify";

import { useLanguage } from "utils/hooks";

import { BackgroundImage } from "./components";
import { MainPageI, MainPagePropsI } from "./interface";
import { Header } from "../components";

const AboutMe = dynamic(() => import("./components/AboutMe"), {
  ssr: false,
});

const Portfolio = dynamic(() => import("./components/Portfolio"), {
  ssr: false,
});

const Contacts = dynamic(() => import("./components/Contacts"), {
  ssr: false,
});

const Footer = dynamic(() => import("commons/Footer"), {
  ssr: false,
});

const MainPage: FC<MainPagePropsI> = ({ dataResponse }) => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<MainPageI | null>(
    dataResponse.responseBody || null
  );
  useEffect(() => {
    if (!dataResponse.status) {
      toast(t(dataResponse.message as string), {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (dataResponse.responseBody) {
      setData(dataResponse.responseBody);
    }
  }, [dataResponse, t]);

  return (
    <>
      {data && (
        <>
          <Head>
            {/* @ts-ignore */}
            <meta name="description" content={data.descriptionPage[language]} />
            {/* @ts-ignore */}
            <meta name="keywords" content={data.keyWordsPage[language]} />

            {/* мета теги для вк */}
            <meta name="og:title" content="WEB FOR SELF" />
            <meta name="og:type" content="website" />
          </Head>
          <Header />
          <BackgroundImage
            firstBlockTitle={data.firstBlockTitle}
            firstBlockSubtitle={data.firstBlockSubtitle}
            imageName={data.firstBlockBackgroundImage}
          />
          <AboutMe
            aboutMeDescription={data.aboutMeDescription}
            aboutMeTitle={data.aboutMeTitle}
            imageName={data.aboutMePhoto}
          />
          <Portfolio />
          <Contacts />
          <Footer />
        </>
      )}
    </>
  );
};

export default MainPage;
