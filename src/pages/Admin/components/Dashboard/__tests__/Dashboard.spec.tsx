import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { urls } from "../constants";
import Dashboard from "../Dashboard";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      pathname: "/admin",
    }),
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

describe("Dashboard", () => {
  it("check render component", () => {
    const { getByText } = render(<Dashboard>child</Dashboard>);

    const rootUrls = urls.filter((item) => item.parent === null);

    expect(getByText(/adminPanel/i)).toBeInTheDocument();
    rootUrls.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
    expect(getByText(/exit/i)).toBeInTheDocument();
    expect(getByText(/child/i)).toBeInTheDocument();
  });
});
