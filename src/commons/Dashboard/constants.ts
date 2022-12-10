export const urls = [
  {
    to: "/admin",
    text: "Главная страница",
  },
  {
    to: "/admin/articles",
    text: "Статьи на сайте",
  },
  {
    to: "/admin/feedback",
    text: "Обратная связь",
  },
];

export const urlsDependencies: { [key: string]: string[] } = {
  "/admin/articles": ["/admin/articles/create", "/admin/articles/edit"],
};
