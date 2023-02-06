import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { urls } from "../constants";
import Dashboard from "../Dashboard";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useLocation: () => ({
      pathname: "/admin",
    }),
    useParams: () => ({}),
    useNavigate: () => jest.fn,
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
