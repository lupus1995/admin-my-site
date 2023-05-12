import React, { FC } from "react";

import Head from "next/head";
import { useTranslation } from "react-i18next";

import YandexMetrics from "commons/YandexMetrics";
import { ArticleI } from "pages/interface";
import { ResponseI } from "utils/interfaces";

import Articles from "../src/pages/Page/Articles";
import { getArticles } from "../src/pages/Page/Articles/api";
import { defaultOffset, limit } from "../src/pages/Page/Articles/constants";

export async function getServerSideProps(): Promise<{
  props: {
    response: ResponseI<void | ArticleI[]>;
  };
}> {
  const response = await getArticles({
    offset: defaultOffset - 1,
    limit,
    message: "errorDataMessage",
  });

  return {
    props: {
      response,
    },
  };
}

const Index: FC<{ response: ResponseI<void | ArticleI[]> }> = ({
  response,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("portfolioTitlePage")}</title>
      </Head>
      <YandexMetrics />
      <Articles response={response} />
    </>
  );
};

export default Index;
