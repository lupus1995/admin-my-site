import React from "react";

import injectSheet from "react-jss";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useStylesTag } from "utils/stylesPage";

import {
  ArticlesForm,
  ArticleList,
  Home,
  MainPage,
  SignIn,
  SignUp,
  Feedback,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import "./resetDefaultStylesBrowsers.css";
import "./roboto.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/articles" element={<ArticleList />} />
        <Route path="/admin/articles/create" element={<ArticlesForm />} />
        <Route path="/admin/articles/edit/:id" element={<ArticlesForm />} />
        <Route path="/admin/feedback" element={<Feedback />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default injectSheet(useStylesTag)(App);
