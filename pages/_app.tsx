import React from "react";

import App, { AppContext, AppProps } from "next/app";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/resetDefaultStylesBrowsers.css";
import "../src/roboto.css";
import { getCurrentLanguager } from "utils/helpers";
import { useStylesTag } from "utils/stylesPage";

import i18n from "../src/i18n";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useStylesTag();
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  return (
    <JssProvider registry={sheets} generateId={generateId}>
      <Component {...pageProps} />
    </JssProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  if (appContext.ctx.req) {
    const {
      ctx: {
        // @ts-ignore
        req: { cookies },
      },
    } = appContext;

    // инициализация на сервере языка разметки
    // если этого не сделать, то может возникнуть ошибка рендеринга между сервером и клиентом
    await i18n.init({
      lng: getCurrentLanguager({ language: cookies.i18nextLng || "" }),
    });
  }

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default MyApp;
