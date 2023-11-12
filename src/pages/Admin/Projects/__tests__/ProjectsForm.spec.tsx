import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import reactI18next from "utils/mocks/react-i18next";

import * as hooks from "../hooks";
import ProjectsForm from "../ProjectsForm";

jest.mock("../hooks");
jest.mock("react-i18next", () => reactI18next({ language: "ru" }));
jest.mock("../../hooks", () => {
  const module = jest.requireActual("../../hooks");

  return {
    ...module,
    useSession: jest.fn(),
    useUpdateTextError: jest.fn(),
  };
});

jest.mock("../../components", () => {
  const module = jest.requireActual("../../components");

  return {
    ...module,
    Dashboard: ({ children }: { children: ReactNode }) => (
      <span>{children}</span>
    ),
    BlockImageInput: () => <span>BlockImageInput</span>,
    AdminDatePicker: () => <span>AdminDatePicker</span>,
  };
});

jest.mock("../../widget", () => {
  const module = jest.requireActual("../../widget");

  return {
    ...module,
    HidePublished: () => <span>HidePublished</span>,
  };
});

jest.mock("../../commons", () => {
  const module = jest.requireActual("../../commons");

  return {
    ...module,
    ButtonSubmit: () => <span>ButtonSubmit</span>,
    LinkToUrl: () => <span>LinkToUrl</span>,
    TextError: () => <span>TextError</span>,
  };
});

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      query: {
        id: null,
      },
    }),
  };
});

jest.mock("store/hooks", () => {
  const module = jest.requireActual("store/hooks");

  return {
    ...module,
    useAppDispatch: jest.fn().mockResolvedValue({ status: true }),
  };
});

describe("ProjectsForm", () => {
  it("check render component with init data", () => {
    jest.spyOn(hooks, "useInitFormProjects").mockReturnValue(true);
    jest.spyOn(hooks, "useSaveProject").mockReturnValue(jest.fn());
    const { getAllByText, getByText, getAllByRole } = render(<ProjectsForm />);

    const ru = getAllByText("ru");
    const en = getAllByText("en");
    const textError = getAllByText(/TextError/i);
    const inputs = getAllByRole("textbox") as HTMLInputElement[];

    const titleRu = inputs.find((item) => item.name === "title.ru");
    const titleEn = inputs.find((item) => item.name === "title.en");

    const descriptionRu = inputs.find((item) => item.name === "description.ru");
    const descriptionEn = inputs.find((item) => item.name === "description.en");

    const keyWordsRu = inputs.find((item) => item.name === "keyWords.ru");
    const keyWordsEn = inputs.find((item) => item.name === "keyWords.en");

    const linkToProjectOnUi = inputs.find(
      (item) => item.name === "linkToProjectOnUi"
    );

    expect(getByText(/editedProject/i)).toBeInTheDocument();
    expect(getByText(/firstBlockTitleLabel/i)).toBeInTheDocument();
    expect(ru.length === 3).toBeTruthy();
    expect(titleRu).toBeInTheDocument();
    expect(textError.length === 7).toBeTruthy();
    expect(en.length === 3).toBeTruthy();
    expect(titleEn).toBeInTheDocument();
    expect(getByText(/descriptionLabelProject/i)).toBeInTheDocument();
    expect(descriptionRu).toBeInTheDocument();
    expect(descriptionEn).toBeInTheDocument();
    expect(getByText(/BlockImageInput/i)).toBeInTheDocument();
    expect(getByText(/keyWordsLabelProject/i)).toBeInTheDocument();
    expect(keyWordsRu).toBeInTheDocument();
    expect(keyWordsEn).toBeInTheDocument();
    expect(getByText(/AdminDatePicker/i)).toBeInTheDocument();
    expect(getByText(/linkToProjectOnUiLink/i)).toBeInTheDocument();
    expect(linkToProjectOnUi).toBeInTheDocument();
    expect(getByText(/HidePublished/i)).toBeInTheDocument();
    expect(getByText(/ButtonSubmit/i)).toBeInTheDocument();
    expect(getByText(/LinkToUrl/i)).toBeInTheDocument();
  });
  it("check render component with not init data", () => {
    jest.spyOn(hooks, "useInitFormProjects").mockReturnValue(false);
    jest.spyOn(hooks, "useSaveProject").mockReturnValue(jest.fn());
    const { queryAllByText, getByText, queryByText, queryAllByRole } = render(
      <ProjectsForm />
    );

    const ru = queryAllByText("ru");
    const en = queryAllByText("en");
    const textError = queryAllByText(/TextError/i);
    const inputs = queryAllByRole("textbox") as HTMLInputElement[];

    const titleRu = inputs.find((item) => item.name === "title.ru");
    const titleEn = inputs.find((item) => item.name === "title.en");

    const descriptionRu = inputs.find((item) => item.name === "description.ru");
    const descriptionEn = inputs.find((item) => item.name === "description.en");

    const keyWordsRu = inputs.find((item) => item.name === "keyWords.ru");
    const keyWordsEn = inputs.find((item) => item.name === "keyWords.en");

    const linkToProjectOnUi = inputs.find(
      (item) => item.name === "linkToProjectOnUi"
    );

    expect(getByText(/editedProject/i)).toBeInTheDocument();
    expect(queryByText(/firstBlockTitleLabel/i)).not.toBeInTheDocument();
    expect(ru.length === 3).not.toBeTruthy();
    expect(titleRu).toBeUndefined();
    expect(textError.length === 7).not.toBeTruthy();
    expect(en.length === 3).not.toBeTruthy();
    expect(titleEn).toBeUndefined();
    expect(queryByText(/descriptionLabelProject/i)).not.toBeInTheDocument();
    expect(descriptionRu).toBeUndefined();
    expect(descriptionEn).toBeUndefined();
    expect(queryByText(/BlockImageInput/i)).not.toBeInTheDocument();
    expect(queryByText(/keyWordsLabelProject/i)).not.toBeInTheDocument();
    expect(keyWordsRu).toBeUndefined();
    expect(keyWordsEn).toBeUndefined();
    expect(queryByText(/AdminDatePicker/i)).not.toBeInTheDocument();
    expect(queryByText(/linkToProjectOnUiLink/i)).not.toBeInTheDocument();
    expect(linkToProjectOnUi).toBeUndefined();
    expect(queryByText(/HidePublished/i)).not.toBeInTheDocument();
    expect(queryByText(/ButtonSubmit/i)).not.toBeInTheDocument();
    expect(queryByText(/LinkToUrl/i)).not.toBeInTheDocument();
  });
});
