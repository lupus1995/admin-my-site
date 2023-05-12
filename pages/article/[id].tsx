import { ParsedUrlQuery } from "querystring";

import React, { FC, useEffect, useState } from "react";

import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import YandexMetrics from "commons/YandexMetrics";
import { getArticle as getArticleForAdmin } from "pages/Admin/Articles/ArticlesForm/api";
import { ArticleI } from "pages/interface";
import Article from "pages/Page/Article";
import { getArticle } from "pages/Page/Article/api";
import { ResponseI } from "utils/interfaces";

interface ArticleQueryParamsI extends ParsedUrlQuery {
  isAdmin: string;
  id: string;
}

function getResponse(response: ResponseI<void | ArticleI>) {
  return {
    ...response,
    redirectTo: "/404",
  };
}

function hasId(id: string) {
  return typeof id === "string";
}

function hasAdmin(isAdmin: string) {
  return isAdmin === "true";
}

function visibleForAdmin({
  isAdmin,
  id,
}: {
  isAdmin: string | undefined;
  id: string;
}) {
  if (hasId(id)) {
    return hasAdmin(isAdmin);
  }

  return false;
}

function visibleForUser({
  isAdmin,
  id,
}: {
  isAdmin: string | undefined;
  id: string;
}) {
  return hasId(id) && !hasAdmin(isAdmin);
}

/**
 * проверка на админа происходит в компоненте, потому что на стороне сервера нельзя прочитать local storage
 */

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<{
  props: {
    response: ResponseI<void | ArticleI> | null;
  };
}> {
  const { id, isAdmin } = query as ArticleQueryParamsI;

  if (visibleForUser({ isAdmin, id })) {
    const params = { id, message: "errorDataMessage" };
    const response = await getArticle(params);

    return {
      props: {
        response: getResponse(response),
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
  const query = useRouter().query as ArticleQueryParamsI;

  const { id, isAdmin } = query;

  useEffect(() => {
    if (visibleForAdmin({ isAdmin, id })) {
      const params: { id: string } = { id };
      getArticleForAdmin(params).then((data) => {
        setResponseArticle(getResponse(data));
      });
    }
  }, [id, isAdmin]);

  if (responseArticle === null) {
    return null;
  }

  return (
    <>
      <YandexMetrics />
      <Article response={responseArticle} />
    </>
  );
};

export default Index;
