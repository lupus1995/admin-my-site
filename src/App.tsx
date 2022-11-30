import React from "react";

import injectSheet from "react-jss";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useStylesTag } from "utils/stylesPage";

import { Articles, Home, MainPage, SignIn, SignUp } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
        <Route path="/admin/articles" element={<Articles />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default injectSheet(useStylesTag)(App);
