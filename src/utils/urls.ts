import { lazy } from "react";

import { UrlsI } from "./interfaces";

const MainPage = lazy(() => import("pages/Page/MainPage"));
const Articles = lazy(() => import("pages/Page/Articles"));
const Article = lazy(() => import("pages/Page/Article"));
const PageNotFound = lazy(() => import("pages/Page/404Page"));
const SignUp = lazy(() => import("pages/Admin/SignUp"));
const SignIn = lazy(() => import("pages/Admin/SignIn"));
const Home = lazy(() => import("pages/Admin/Home"));
const ArticleList = lazy(() => import("pages/Admin/Articles/ArticleList"));
const ArticlesForm = lazy(() => import("pages/Admin/Articles/ArticlesForm"));
const Feedback = lazy(() => import("pages/Admin/Feedback"));

const urls: UrlsI[] = [
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "/articles",
    Component: Articles,
  },
  {
    path: "/article/:id",
    Component: Article,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/admin",
    Component: Home,
  },
  {
    path: "/admin/articles",
    Component: ArticleList,
  },
  {
    path: "/admin/articles/create",
    Component: ArticlesForm,
  },
  {
    path: "/admin/articles/edit/:id",
    Component: ArticlesForm,
  },
  {
    path: "/admin/feedback",
    Component: Feedback,
  },
  {
    path: "/not-found",
    Component: PageNotFound,
  },
];

export default urls;
