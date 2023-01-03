import React, { Suspense } from "react";

import injectSheet from "react-jss";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useStylesTag } from "utils/stylesPage";

import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import "./resetDefaultStylesBrowsers.css";
import "./roboto.css";

import MainPage from "./pages/Page/MainPage";

const SignUp = React.lazy(() => import("./pages/Admin/SignUp"));
const SignIn = React.lazy(() => import("./pages/Admin/SignIn"));
const Home = React.lazy(() => import("./pages/Admin/Home"));
const Feedback = React.lazy(() => import("./pages/Admin/Feedback"));
const ArticleList = React.lazy(
  () => import("./pages/Admin/Articles/ArticleList")
);
const ArticlesForm = React.lazy(
  () => import("./pages/Admin/Articles/ArticlesForm")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <ArticleList />
            </Suspense>
          }
        />
        <Route
          path="/admin/articles/create"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <ArticlesForm />
            </Suspense>
          }
        />
        <Route
          path="/admin/articles/edit/:id"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <ArticlesForm />
            </Suspense>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <Feedback />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default injectSheet(useStylesTag)(App);
