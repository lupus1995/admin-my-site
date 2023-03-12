import React, { FC, useEffect, useState } from "react";

import { toast } from "react-toastify";

import Footer from "commons/Footer";
import { useLanguage } from "utils/hooks";

import { BackgroundImage, AboutMe, Portfolio, Contacts } from "./components";
import { MainPageI, MainPagePropsI } from "./interface";
import { Header } from "../components";

const MainPage: FC<MainPagePropsI> = ({
  dataResponse,
  imageNameResponse,
  newArticlesResponse,
}) => {
  const { t } = useLanguage();
  const [data, setData] = useState<MainPageI | null>(
    dataResponse.responseBody || null
  );
  const [imageName, setImageName] = useState<{
    firstBlockBackgroundImage: string;
    aboutMePhoto: string;
  }>(
    imageNameResponse.responseBody || {
      firstBlockBackgroundImage: "",
      aboutMePhoto: "",
    }
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

    if (!imageNameResponse.status) {
      toast(t(imageNameResponse.message as string), {
        type: "error",
        hideProgressBar: true,
        theme: "colored",
      });

      return;
    }

    if (imageNameResponse.responseBody) {
      setImageName(imageNameResponse.responseBody);
    }
  }, [dataResponse, imageNameResponse, t]);

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
          <Portfolio newArticlesResponse={newArticlesResponse} />
          <Contacts />
          <Footer />
        </>
      )}
    </>
  );
};

export default MainPage;
