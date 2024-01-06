import React from "react";

import { render } from "@testing-library/react";

import WrapperPage from "../WrapperPage";

jest.mock("pages/Page/components", () => {
  const mockModule = jest.requireActual("pages/Page/components");

  return {
    ...mockModule,
    Header: () => <span>Header</span>,
  };
});

jest.mock("commons/Footer", () => {
  const mockModule = jest.requireActual("commons/Footer");

  return {
    ...mockModule,
    Footer: () => <span>Footer</span>,
  };
});

describe("WrapperPage", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperPage>children</WrapperPage>);

    expect(getByText(/Header/i)).toBeInTheDocument();
    expect(getByText(/Footer/i)).toBeInTheDocument();
    expect(getByText(/children/i)).toBeInTheDocument();
  });
});
