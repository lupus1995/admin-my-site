import { LinkI } from "./interface";

export const urls: LinkI[] = [
  {
    to: "/admin",
    text: "mainPage",
    parent: null,
  },
  {
    to: "/admin/articles",
    text: "articlesOnSite",
    parent: null,
  },
  {
    to: "/admin/articles/create",
    text: "",
    parent: "/admin/articles",
  },
  {
    to: "/admin/articles/edit/[id]",
    text: "",
    parent: "/admin/articles",
  },
  {
    to: "/admin/feedback",
    text: "feedback",
    parent: null,
  },
  {
    to: "/admin/projects",
    text: "projectsTitlePage",
    parent: null,
  },
  {
    to: "/admin/projects/create",
    text: "",
    parent: "/admin/projects",
  },
  {
    to: "/admin/projects/edit/[id]",
    text: "",
    parent: "/admin/projects",
  },
];
