import React from "react";

import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/resetDefaultStylesBrowsers.css";
import "../src/roboto.css";

import { getCurrentLanguager } from "utils/helpers";
import { useStylesTag } from "utils/stylesPage";

import i18n from "../src/i18n";

const env = process.env.NODE_ENV;
const hostNameEnv = process.env.NEXT_PUBLIC_HOSTNAME;

const MyApp = ({ Component, pageProps, host }: AppProps & { host: string }) => {
  useStylesTag();
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  return (
    <JssProvider registry={sheets} generateId={generateId}>
      {host === hostNameEnv && env === "production" && (
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
  let host = "";
  if (appContext.ctx.req) {
    const {
      ctx: {
        req: {
          // @ts-ignore
          cookies,
          headers: { host: hostName },
        },
      },
    } = appContext;

    host = hostName;

    // инициализация на сервере языка разметки
    // если этого не сделать, то может возникнуть ошибка рендеринга между сервером и клиентом
    await i18n.init({
      lng: getCurrentLanguager({ language: cookies.i18nextLng || "" }),
    });
  }

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    host,
  };
};

export default MyApp;
