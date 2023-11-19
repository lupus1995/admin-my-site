import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import ArticlesForm from "../ArticlesForm";

jest.mock("../hooks", () => {
  const module = jest.requireActual("../hooks");

  return {
    ...module,
    useSaveArticle: jest.fn(),
    useInitFormArticle: jest.fn().mockReturnValue(true),
  };
});

jest.mock("pages/Admin/hooks", () => {
  const module = jest.requireActual("pages/Admin/hooks");

  return {
    ...module,
    useSession: jest.fn(),
  };
});

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      query: {
        id: "id",
      },
    }),
  };
});

jest.mock("pages/Admin/components", () => {
  const module = jest.requireActual("pages/Admin/components");

  return {
    ...module,
    Dashboard: ({ children }: { children: ReactNode }) => <>{children}</>,
    AdminEditor: () => <span>AdminEditor</span>,
    BlockImageInput: () => <span>BlockImageInput</span>,
    AdminDatePicker: () => <span>AdminDatePicker</span>,
    AdminCheckbox: () => <span>AdminCheckbox</span>,
  };
});

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

describe("ArticlesForm", () => {
  it("check render component", async () => {
    const { getByText, findByText, findAllByRole, findAllByText } = render(
      <ArticlesForm />
    );

    const inputs = await findAllByRole("textbox");
    const titleRu = inputs.find(
      (input: HTMLInputElement) => input.name === "title.ru"
    );
    const descriptionRu = inputs.find(
      (input: HTMLInputElement) => input.name === "description.ru"
    );
    const keyWordsRu = inputs.find(
      (input: HTMLInputElement) => input.name === "keyWords.ru"
    );

    const titleEn = inputs.find(
      (input: HTMLInputElement) => input.name === "title.en"
    );
    const descriptionEn = inputs.find(
      (input: HTMLInputElement) => input.name === "description.en"
    );
    const keyWordsEn = inputs.find(
      (input: HTMLInputElement) => input.name === "keyWords.en"
    );

    const adminEditor = await findAllByText(/AdminEditor/i);

    expect(getByText(/editedArticle/i));

    expect(await findByText(/firstBlockTitleLabel/i));
    expect(titleRu).toBeInTheDocument();
    expect(titleEn).toBeInTheDocument();

    expect(await findByText(/descriptionLabel/i));
    expect(descriptionRu).toBeInTheDocument();
    expect(descriptionEn).toBeInTheDocument();

    expect(await findByText(/BlockImageInput/i)).toBeInTheDocument();
    expect(adminEditor.length).toBe(2);

    expect(await findByText(/keyWordsLabel/i)).toBeInTheDocument();
    expect(keyWordsRu).toBeInTheDocument();
    expect(keyWordsEn).toBeInTheDocument();

    expect(await findByText(/AdminDatePicker/i)).toBeInTheDocument();
    expect(await findByText(/AdminCheckbox/i)).toBeInTheDocument();

    expect(await findByText(/submit/i)).toBeInTheDocument();
    expect(await findByText(/return/i)).toBeInTheDocument();
  });
});
