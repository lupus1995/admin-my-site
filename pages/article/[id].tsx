import React, { FC } from "react";

import { GetServerSidePropsContext } from "next";

import { ArticleI } from "pages/interface";
import Article from "pages/Page/Article";
import { getArticle, getArticleForAdmin } from "pages/Page/Article/api";
import { ResponseI } from "utils/interfaces";

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<{
  props: {
    response: ResponseI<void | ArticleI> | null;
  };
}> {
  const { id, isAdmin } = query;

  const request = isAdmin === "true" ? getArticleForAdmin : getArticle;

  if (typeof id === "string") {
    const params = { id, message: "errorDataMessage" };
    const response = await request(params);

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
  return <Article response={response} />;
};

export default Index;
