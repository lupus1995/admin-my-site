import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import ArticlesForm from "../ArticlesForm";

jest.mock("store/services/manageModules", () => {
  const moduleMock = jest.requireActual("store/services/manageModules");

  return {
    ...moduleMock,
    useSetAdminBlogModule: () => jest.fn(),
  };
});

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
    useSaveArticle: jest.fn(),
    useInitFormArticle: jest.fn().mockReturnValue(true),
  };
});

jest.mock("pages/Admin/hooks", () => {
  const mockModule = jest.requireActual("pages/Admin/hooks");

  return {
    ...mockModule,
    useSession: jest.fn(),
  };
});

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      query: {
        id: "id",
      },
    }),
  };
});

jest.mock("pages/Admin/components", () => {
  const mockModule = jest.requireActual("pages/Admin/components");

  return {
    ...mockModule,
    Dashboard: ({ children }: { children: ReactNode }) => <>{children}</>,
    AdminEditor: () => <span>AdminEditor</span>,
    BlockImageInput: () => <span>BlockImageInput</span>,
    AdminDatePicker: () => <span>AdminDatePicker</span>,
    AdminCheckbox: () => <span>AdminCheckbox</span>,
  };
});

jest.mock("pages/Admin/Articles/ArticlesForm/api", () => {
  const mockModule = jest.requireActual(
    "pages/Admin/Articles/ArticlesForm/api"
  );

  return {
    ...mockModule,
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

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
    useUploadImage: jest.fn().mockReturnValue({
      handleUploadImage: jest.fn(),
    }),
    useSaveArticle: jest.fn(),
    useInitFormArticle: jest.fn().mockReturnValue(true),
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
