import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { get, getImageName } from "pages/Page/MainPage/api";

import {
  Header,
  BackgroundImage,
  AboutMe,
  Portfolio,
  Contacts,
  Footer,
} from "./components";
import { MainPageI } from "./interface";

const MainPage = () => {
  const [data, setData] = useState<MainPageI | null>(null);
  const [imageName, setImageName] = useState<{
    firstBlockBackgroundImage: string;
    aboutMePhoto: string;
  }>();
  useEffect(() => {
    get({
      message:
        "Ошибка при получении данных, перезагрузите страницу или обратитесь к администратору",
    }).then((result) => {
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

    getImageName().then((result) => {
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
  }, []);

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
