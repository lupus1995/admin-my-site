import { ProjectI } from "pages/interface";

const commonData = {
  publishedAt: "2023-05-12T00:00:00.000Z",
  title: {
    en: "title en",
    ru: "title ru",
  },
  thumbnail: "thumbnail",
  description: {
    en: "description en",
    ru: "description ru",
  },
  _id: "_id111",
};

export const testDataContent = {
  ...commonData,
  url: "/chart",
};

export const project: ProjectI = {
  ...commonData,
  linkToProjectOnUi: "/chart",
  createdAt: "2023-05-12T00:00:00.000Z",
  updatedAt: "2023-05-12T00:00:00.000Z",
  keyWords: {
    en: "keyWords en",
    ru: "keyWords ru",
  },
  hidePublished: false,
};
