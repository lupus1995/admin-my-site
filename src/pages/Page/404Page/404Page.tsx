import React from "react";

import { Link } from "react-router-dom";

import Footer from "commons/Footer";

import { Header } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <p>Страница не найдена. Обратитесь к владельцу сайта</p>
      <Link to="/">Главная страница</Link>
      <Footer />
    </>
  );
};

export default PageNotFound;
