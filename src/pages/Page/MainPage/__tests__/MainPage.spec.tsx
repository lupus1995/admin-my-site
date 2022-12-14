import React from "react";

import { render } from "@testing-library/react";

import MainPage from "../MainPage";

jest.mock("pages/Page/MainPage/api", () => {
  const module = jest.requireActual("pages/Page/MainPage/api");

  return {
    ...module,
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
    getImageName: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
          status: true,
          responseBody: {
            firstBlockBackgroundImage: "firstBlockBackgroundImage",
            aboutMePhoto: "aboutMePhoto",
          },
        })
      )
    ),
  };
});

jest.mock("pages/Page/MainPage/components", () => {
  const module = jest.requireActual("pages/Page/MainPage/components");

  return {
    ...module,
    Header: () => <span>Header</span>,
    BackgroundImage: () => <span>BackgroundImage</span>,
    AboutMe: () => <span>AboutMe</span>,
    Portfolio: () => <span>Portfolio</span>,
    Contacts: () => <span>Contacts</span>,
    Footer: () => <span>Footer</span>,
  };
});

describe("MainPage", () => {
  it("check render component", async () => {
    const { findByText } = render(<MainPage />);

    expect(await findByText(/Header/i)).toBeInTheDocument();
    expect(await findByText(/BackgroundImage/i)).toBeInTheDocument();
    expect(await findByText(/AboutMe/i)).toBeInTheDocument();
    expect(await findByText(/Portfolio/i)).toBeInTheDocument();
    expect(await findByText(/Contacts/i)).toBeInTheDocument();
    expect(await findByText(/Footer/i)).toBeInTheDocument();
  });
});
