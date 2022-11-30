import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { HomeFormI } from "pages/Admin/Home/interfaces";
import { get } from "pages/api";

import { Header } from "./components";
import BackgroundImage from "./components/BackgroundImage";

const MainPage = () => {
  const [data, setData] = useState<HomeFormI | null>(null);
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
  }, []);

  return (
    <>
      {data && (
        <>
          <Header />
          <BackgroundImage imageName={data.firstBlockBackgroundImage} />
        </>
      )}
    </>
  );
};

export default MainPage;
