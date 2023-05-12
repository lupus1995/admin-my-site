import React from "react";

import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/resetDefaultStylesBrowsers.css";
import "../src/roboto.css";

import { URL } from "utils/constants";
import { getCurrentLanguager, hasWindow } from "utils/helpers";
import { useStylesTag } from "utils/stylesPage";

import i18n from "../src/i18n";
const env = process.env.NODE_ENV;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useStylesTag();
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  const visibleYandexMetrics =
    env === "production" &&
    window?.location.origin === "https://nest.webforself.ru";

  return (
    <JssProvider registry={sheets} generateId={generateId}>
      {visibleYandexMetrics && (
        <Head>
          <meta name="yandex-verification" content="1b8ba196c8180663" />
        </Head>
      )}
      <Component {...pageProps} />
      <ToastContainer />
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
    pageProps: { ...appProps.pageProps },
  };
};

export default MyApp;
