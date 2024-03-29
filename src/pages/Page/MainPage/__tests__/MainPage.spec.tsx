import React from "react";

import { render } from "@testing-library/react";

import MainPage from "../MainPage";

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = (): null => null;
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

jest.mock("pages/Page/MainPage/api", () => {
  const mockModule = jest.requireActual("pages/Page/MainPage/api");

  return {
    ...mockModule,
    get: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
          status: true,
          responseBody: {
            firstBlockBackgroundImage: "firstBlockBackgroundImage",
            firstBlockTitle: "firstBlockTitle",
            firstBlockSubtitle: "firstBlockSubtitle",
            aboutMeTitle: "aboutMeTitle",
            aboutMeDescription: "aboutMeDescription",
            aboutMePhoto: "aboutMePhoto",
            _id: "_idasdasd",
          },
        })
      )
    ),
  };
});

jest.mock("../../components", () => {
  const mockModule = jest.requireActual("../../components");

  return {
    ...mockModule,
    Header: () => <span>Header</span>,
  };
});

// eslint-disable-next-line react/display-name
jest.mock("commons/Footer", () => () => <span>Footer</span>);

jest.mock("../components", () => {
  const mockModule = jest.requireActual("../components");

  return {
    ...mockModule,
    BackgroundImage: () => <span>BackgroundImage</span>,
    AboutMe: () => <span>AboutMe</span>,
    Portfolio: () => <span>Portfolio</span>,
    Contacts: () => <span>Contacts</span>,
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("MainPage", () => {
  it("check render component", async () => {
    const { findByText } = render(
      <MainPage
        dataResponse={{
          status: true,
          responseBody: {
            descriptionPage: {
              ru: "ru",
              en: "en",
            },
            keyWordsPage: {
              en: "en",
              ru: "ru",
            },
            firstBlockTitle: {
              ru: "ru",
              en: "en",
            },
            firstBlockSubtitle: {
              ru: "ru",
              en: "en",
            },
            firstBlockBackgroundImage: "firstBlockBackgroundImage",
            aboutMeDescription: {
              ru: "ru",
              en: "en",
            },
            aboutMeTitle: {
              ru: "ru",
              en: "en",
            },
            aboutMePhoto: "aboutMePhoto",
          },
        }}
      />
    );

    expect(await findByText(/Header/i)).toBeInTheDocument();
    expect(await findByText(/BackgroundImage/i)).toBeInTheDocument();

    // expect(await findByText(/AboutMe/i)).toBeInTheDocument();
    // expect(await findByText(/Portfolio/i)).toBeInTheDocument();
    // expect(await findByText(/Contacts/i)).toBeInTheDocument();
    // expect(await findByText(/Footer/i)).toBeInTheDocument();
  });
});
