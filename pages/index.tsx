import React, { FC } from "react";

import { get, getImageName } from "pages/Page/MainPage/api";
import { getNewArticles } from "pages/Page/MainPage/components/Portfolio/api";
import { MainPagePropsI } from "pages/Page/MainPage/interface";

import MainPage from "../src/pages/Page/MainPage";

export async function getServerSideProps(): Promise<{
  props: MainPagePropsI;
}> {
  const dataResponse = await get({ message: "errorDataMessage" });
  const imageNameResponse = await getImageName({
    message: "errorDataMessage",
  });
  const newArticlesResponse = await getNewArticles({
    message: "errorDataMessage",
  });

  return {
    props: {
      dataResponse,
      imageNameResponse,
      newArticlesResponse,
    },
  };
}

const Index: FC<MainPagePropsI> = ({
  dataResponse,
  imageNameResponse,
  newArticlesResponse,
}) => {
  return (
    <MainPage
      dataResponse={dataResponse}
      imageNameResponse={imageNameResponse}
      newArticlesResponse={newArticlesResponse}
    />
  );
};

export default Index;
