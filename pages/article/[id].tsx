import React, { FC, useEffect, useState } from "react";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArticleI } from "pages/interface";
import Article from "pages/Page/Article";
import { getArticle, getArticleForAdmin } from "pages/Page/Article/api";
import { useLanguage } from "utils/hooks";
import { ResponseI } from "utils/interfaces";

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<{
  props: {
    response: ResponseI<void | ArticleI> | null;
  };
}> {
  const { id, isAdmin } = query;

  if (isAdmin !== "true" && typeof id === "string") {
    const params = { id, message: "errorDataMessage" };
    const response = await getArticle(params);

    return {
      props: {
        response,
      },
    };
  }

  return {
    props: {
      response: null,
    },
  };
}

const Index: FC<{ response: ResponseI<void | ArticleI> }> = ({ response }) => {
  const [responseArticle, setResponseArticle] = useState(response);
  const [initData, setInitData] = useState(false);
  const { language } = useLanguage();
  const {
    query: { id, isAdmin },
  } = useRouter();

  useEffect(() => {
    if (isAdmin === "true" && typeof id === "string") {
      const params = { id, message: "errorDataMessage" };
      getArticleForAdmin(params)
        .then(setResponseArticle)
        .finally(() => setInitData(true));
    } else {
      setInitData(true);
    }
  }, [id, isAdmin]);

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <title>{responseArticle.responseBody.title[language]}</title>
      </Head>
      {initData && <Article response={responseArticle} />}
    </>
  );
};

export default Index;
