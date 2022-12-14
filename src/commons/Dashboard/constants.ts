import { LinkI } from "./interface";

export const urls: LinkI[] = [
  {
    to: "/admin",
    text: "Главная страница",
    parent: null,
  },
  {
    to: "/admin/articles",
    text: "Статьи на сайте",
    parent: null,
  },
  {
    to: "/admin/articles/create",
    text: "",
    parent: "/admin/articles",
  },
  {
    to: "/admin/articles/edit",
    text: "",
    parent: "/admin/articles",
  },
  {
    to: "/admin/feedback",
    text: "Обратная связь",
    parent: null,
  },
];
