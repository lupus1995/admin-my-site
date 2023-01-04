import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Home from "../Home";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useNavigate: () => jest.fn,
  };
});

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

jest.mock("commons/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("commons/BlockImageInput", () =>
  // eslint-disable-next-line react/display-name
  () => <span>BlockImageInput</span>
);

jest.mock("commons/AdminEditor", () =>
  // eslint-disable-next-line react/display-name
  () => <span>AdminEditor</span>
);

describe("Home", () => {
  it("check render component", async () => {
    const { getByText, findAllByText, findAllByRole } = render(<Home />);

    const BlockImageInput = await findAllByText(/BlockImageInput/i);
    const textBoxs = await findAllByRole("textbox");

    const firstBlockTitle = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockTitle"
    );

    const firstBlockSubtitle = textBoxs.find(
      (item: HTMLInputElement) => item.name === "firstBlockSubtitle"
    );

    const aboutMeTitle = textBoxs.find(
      (item: HTMLInputElement) => item.name === "aboutMeTitle"
    );

    expect(getByText(/mainPage/i)).toBeInTheDocument();
    expect(BlockImageInput.length).toBe(2);

    expect(getByText("firstBlockTitleLabel")).toBeInTheDocument();
    expect(firstBlockTitle).toBeInTheDocument();

    expect(getByText(/firstBlockSubtitleLabel/i)).toBeInTheDocument();
    expect(firstBlockSubtitle).toBeInTheDocument();

    expect(getByText(/aboutMeTitleLabel/i)).toBeInTheDocument();
    expect(aboutMeTitle).toBeInTheDocument();

    expect(getByText(/AdminEditor/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
