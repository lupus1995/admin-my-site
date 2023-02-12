import React, { lazy, Suspense } from "react";

import injectSheet from "react-jss";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PageNotFound } from "pages/index";
import { hasWindow } from "utils/helpers";
import { useStylesTag } from "utils/stylesPage";
import urls from "utils/urls";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import resetDefaultStylesBrowsers from "./resetDefaultStylesBrowsers";

const Roboto = lazy(() => {
  if (hasWindow()) {
    return import("./RobotoFont");
  }

  return null;
});

const App = () => {
  resetDefaultStylesBrowsers();
  return (
    <>
      <Suspense fallback="">
        <Roboto />
      </Suspense>
      <Routes>
        {urls.map((url) => {
          const { path, Component } = url;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<p>loading...</p>}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default injectSheet(useStylesTag)(App);
