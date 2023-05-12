import React from "react";

import { render } from "@testing-library/react";

import ContactsSkeleton from "../ContactsSkeleton";

describe("ContactsSkeleton", () => {
  it("check render component", () => {
    const { getByTestId } = render(<ContactsSkeleton />);

    expect(getByTestId("formWrapper")).toBeInTheDocument();
    expect(getByTestId("titleFormWrapper")).toBeInTheDocument();
    expect(getByTestId("formLabelUsername")).toBeInTheDocument();
    expect(getByTestId("formInputUsername")).toBeInTheDocument();
    expect(getByTestId("formLabelFeedback")).toBeInTheDocument();
    expect(getByTestId("formInputFeedback")).toBeInTheDocument();
    expect(getByTestId("formInputSubmit")).toBeInTheDocument();
  });
});
