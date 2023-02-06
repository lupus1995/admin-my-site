import {
  MainPage,
  ListArticle,
  Article,
  SignUp,
  SignIn,
  Home,
  ArticleList,
  ArticlesForm,
  Feedback,
  PageNotFound,
} from "pages/index";

import { UrlsI } from "./interfaces";

const urls: UrlsI[] = [
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "/articles",
    Component: ListArticle,
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
