import React from "react";

import { render } from "@testing-library/react";

import ItemWrapper from "../ItemWrapper";

jest.mock("next/link", () => ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
));

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("ItemWrapper", () => {
  it("check renderr component", () => {
    const { getByText } = render(
      <ItemWrapper href="href" handleClick={jest.fn()}>
        child component
      </ItemWrapper>
    );

    expect(getByText("child component")).toBeInTheDocument();
    expect(getByText("edit")).toBeInTheDocument();
    expect(getByText("delete")).toBeInTheDocument();
  });
});
