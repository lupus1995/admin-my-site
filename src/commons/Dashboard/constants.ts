export const urls = [
  {
    to: "/admin",
    text: "Главная страница",
  },
  {
    to: "/admin/articles",
    text: "Статьи на сайте",
  },
];

export const urlsDependencies: { [key: string]: string[] } = {
  "/admin/articles": ["/admin/articles/create", "/admin/articles/edit"],
};
