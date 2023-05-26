import React, { FC, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";
import { toast } from "react-toastify";

import { FooterSkeleton } from "commons/Footer";
import { useLanguage } from "utils/hooks";

import { BackgroundImage, ContactsSkeleton } from "./components";
import { AboutMeSkeleton } from "./components/AboutMe";
import { MainPageI, MainPagePropsI } from "./interface";
import { Header } from "../components";
import { WrapperContentMainPageBlock } from "../widgets";

const Projects = dynamic(() => import("./components/Projects/Projects"), {
  ssr: false,
  loading: WrapperContentMainPageBlock,
});

const AboutMe = dynamic(() => import("./components/AboutMe/AboutMe"), {
  ssr: false,
  loading: AboutMeSkeleton,
});

const Portfolio = dynamic(() => import("./components/Portfolio/Portfolio"), {
  ssr: false,
  loading: WrapperContentMainPageBlock,
});

const Contacts = dynamic(() => import("./components/Contacts/Contacts"), {
  ssr: false,
  loading: ContactsSkeleton,
});

const Footer = dynamic(() => import("commons/Footer/Footer"), {
  ssr: false,
  loading: FooterSkeleton,
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

  if (!dataResponse.status) {
    return null;
  }

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <meta name="description" content={data.descriptionPage[language]} />
        {/* @ts-ignore */}
        <meta name="keywords" content={data.keyWordsPage[language]} />

        {/* мета теги для вк */}
        <meta name="og:title" content="WEB FOR SELF" />
        <meta name="og:type" content="website" />
        <meta
          name="og:description"
          // @ts-ignore
          content={data.descriptionPage[language]}
        />
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
      <Projects />
      <Contacts />
      <Footer />
    </>
  );
};

export default MainPage;
