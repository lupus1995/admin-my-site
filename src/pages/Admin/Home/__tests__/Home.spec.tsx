import React from "react";

import { render } from "@testing-library/react";

import reactI18next from "utils/mocks/react-i18next";

import Home from "../Home";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("utils/helpers", () => {
  const module = jest.requireActual("utils/helpers");

  return {
    ...module,
    hasWindow: () => true,
  };
});

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

jest.mock("pages/Admin/Home/api", () => {
  const module = jest.requireActual("pages/Admin/Home/api");

  return {
    ...module,
    get: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
          status: true,
          responseBody: {
            firstBlockBackgroundImage: "firstBlockBackgroundImage",
            firstBlockTitle: {
              ru: "firstBlockTitleRU",
              en: "firstBlockTitleEN",
            },
            firstBlockSubtitle: {
              ru: "firstBlockSubtitleRU",
              en: "firstBlockSubtitleEN",
            },
            aboutMeTitle: {
              ru: "aboutMeTitleRU",
              en: "aboutMeTitleEN",
            },
            aboutMeDescription: {
              ru: "aboutMeDescriptionRU",
              en: "aboutMeDescriptionEN",
            },
            aboutMePhoto: "aboutMePhoto",
            _id: "_idasdasd",
          },
        })
      )
    ),
  };
});

jest.mock("../../components", () => {
  const module = jest.requireActual("../../components");

  return {
    ...module,
    Dashboard: ({ children }: { children: JSX.Element }) => <>{children}</>,
    BlockImageInput: () => <span>BlockImageInput</span>,
    AdminEditor: () => <span>AdminEditor</span>,
  };
});

describe("Home", () => {
  it("check render component", async () => {
    const { getByText, getAllByText, findAllByText, findAllByRole } = render(
      <Home />
    );

    const BlockImageInput = await findAllByText(/BlockImageInput/i);
    const AdminEditor = await getAllByText(/AdminEditor/i);
    const textBoxs = await findAllByRole("textbox");

    const firstBlockTitleRU = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockTitle.ru"
    );

    const firstBlockTitleEN = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockTitle.en"
    );

    const firstBlockSubtitleRU = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockSubtitle.ru"
    );

    const firstBlockSubtitleEN = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockSubtitle.en"
    );

    const aboutMeTitleRU = textBoxs.find(
      (item: HTMLInputElement) => item.name === "aboutMeTitle.ru"
    );

    const aboutMeTitleEN = textBoxs.find(
      (item: HTMLInputElement) => item.name === "aboutMeTitle.en"
    );

    expect(getByText(/mainPage/i)).toBeInTheDocument();
    expect(BlockImageInput.length).toBe(2);

    expect(getByText("firstBlockTitleLabel")).toBeInTheDocument();
    expect(firstBlockTitleRU).toBeInTheDocument();
    expect(firstBlockTitleEN).toBeInTheDocument();

    expect(getByText(/firstBlockSubtitleLabel/i)).toBeInTheDocument();
    expect(firstBlockSubtitleRU).toBeInTheDocument();
    expect(firstBlockSubtitleEN).toBeInTheDocument();

    expect(getByText(/aboutMeTitleLabel/i)).toBeInTheDocument();
    expect(aboutMeTitleRU).toBeInTheDocument();
    expect(aboutMeTitleEN).toBeInTheDocument();

    expect(AdminEditor.length).toBe(2);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
