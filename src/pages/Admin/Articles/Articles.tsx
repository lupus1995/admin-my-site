import React, { useEffect, useState } from "react";

import classNames from "classnames";

import Dashboard from "commons/Dashboard";
import FormRow from "commons/FormRow";
import Title from "commons/Title";
import useUtilsStyles from "utils/styles";

import { getArticles } from "./api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const utilsStyles = useUtilsStyles();

  useEffect(() => {
    getArticles().then((data) => console.log("data", data));
  }, []);
  return (
    <Dashboard>
      <div className={`${utilsStyles.dFlex} ${utilsStyles.flexColumn}`}>
        <FormRow>
          <Title title="Статьи на сайте" />
        </FormRow>
        <FormRow>
          <button className={classNames(`${utilsStyles.button}`)} type="button">
            Создать статью
          </button>
        </FormRow>
      </div>
    </Dashboard>
  );
};

export default Articles;
