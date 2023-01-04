import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import ArticlesForm from "../ArticlesForm";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useNavigate: () => jest.fn,
    useParams: () => ({ id: "id" }),
  };
});

jest.mock("commons/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("pages/Admin/Articles/ArticlesForm/api", () => {
  const module = jest.requireActual("pages/Admin/Articles/ArticlesForm/api");

  return {
    ...module,
    getArticle: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
          status: true,
          responseBody: {
            title: "title",
            description: "description",
            thumbnail: "thumbnail",
            text: "text",
            keyWords: "keyWords",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            hidePublishedArticle: false,
            _id: "dfgdfg",
          },
        })
      )
    ),
  };
});

// eslint-disable-next-line react/display-name
jest.mock("commons/BlockImageInput", () => () => <span>BlockImageInput</span>);
// eslint-disable-next-line react/display-name
jest.mock("commons/AdminEditor", () => () => <span>AdminEditor</span>);
// eslint-disable-next-line react/display-name
jest.mock("commons/AdminDatePicker", () => () => <span>AdminDatePicker</span>);
// eslint-disable-next-line react/display-name
jest.mock("commons/AdminCheckbox", () => () => <span>AdminCheckbox</span>);

describe("ArticlesForm", () => {
  it("check render component", async () => {
    const { getByText, findByText, findAllByRole } = render(<ArticlesForm />);

    const inputs = await findAllByRole("textbox");
    const title = inputs.find(
      (input: HTMLInputElement) => input.name === "title"
    );
    const description = inputs.find(
      (input: HTMLInputElement) => input.name === "description"
    );
    const keyWords = inputs.find(
      (input: HTMLInputElement) => input.name === "keyWords"
    );

    expect(getByText(/editedArticle/i));

    expect(await findByText(/firstBlockTitleLabel/i));
    expect(title).toBeInTheDocument();

    expect(await findByText(/descriptionLabel/i));
    expect(description).toBeInTheDocument();

    expect(await findByText(/BlockImageInput/i)).toBeInTheDocument();
    expect(await findByText(/AdminEditor/i)).toBeInTheDocument();

    expect(await findByText(/keyWordsLabel/i)).toBeInTheDocument();
    expect(keyWords).toBeInTheDocument();

    expect(await findByText(/AdminDatePicker/i)).toBeInTheDocument();
    expect(await findByText(/AdminCheckbox/i)).toBeInTheDocument();

    expect(await findByText(/submit/i)).toBeInTheDocument();
  });
});
