import React, { FC } from "react";

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
  return <Articles response={response} />;
};

export default Index;
