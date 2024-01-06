import React from "react";

import { render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as redux from "react-redux";

import reactI18next from "utils/mocks/react-i18next";

import Home from "../Home";

fetchMock.enableMocks();

jest.mock("react-redux");

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("utils/helpers", () => {
  const mockModule = jest.requireActual("utils/helpers");

  return {
    ...mockModule,
    hasWindow: () => true,
  };
});

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

jest.mock("pages/Admin/Home/api", () => {
  const mockModule = jest.requireActual("pages/Admin/Home/api");

  return {
    ...mockModule,
    get: jest.fn(),
  };
});

jest.mock("../../components", () => {
  const mockModule = jest.requireActual("../../components");

  return {
    ...mockModule,
    Dashboard: ({ children }: { children: JSX.Element }) => <>{children}</>,
    BlockImageInput: () => <span>BlockImageInput</span>,
    AdminEditor: () => <span>AdminEditor</span>,
  };
});

describe("Home", () => {
  it("check render component", async () => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(
      jest.fn().mockResolvedValue({
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
    );
    const { getByText, findAllByText, findAllByRole } = render(<Home />);

    const BlockImageInput = await findAllByText(/BlockImageInput/i);
    const AdminEditor = await findAllByText(/AdminEditor/i);
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
