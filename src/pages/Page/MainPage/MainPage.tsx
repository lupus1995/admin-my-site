import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Footer from "commons/Footer";
import { get, getImageName } from "pages/Page/MainPage/api";

import { Header } from "../commons";
import { BackgroundImage, AboutMe, Portfolio, Contacts } from "./components";
import { MainPageI } from "./interface";

const MainPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<MainPageI | null>(null);
  const [imageName, setImageName] = useState<{
    firstBlockBackgroundImage: string;
    aboutMePhoto: string;
  }>();
  useEffect(() => {
    get({ message: t("errorDataMessage") }).then((result) => {
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        return;
      }

      if (result.responseBody) {
        setData(result.responseBody);
      }
    });

    getImageName({ message: t("errorDataMessage") }).then((result) => {
      if (!result.status) {
        toast(result.message, {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });

        return;
      }

      if (result.responseBody) {
        setImageName(result.responseBody);
      }
    });
  }, [t]);

  return (
    <>
      {data && imageName && (
        <>
          <Header />
          <BackgroundImage
            firstBlockTitle={data.firstBlockTitle}
            firstBlockSubtitle={data.firstBlockSubtitle}
            imageName={imageName.firstBlockBackgroundImage}
          />
          <AboutMe
            aboutMeDescription={data.aboutMeDescription}
            aboutMeTitle={data.aboutMeTitle}
            imageName={imageName.aboutMePhoto}
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
