import React from "react";

import { render } from "@testing-library/react";

import FooterSkeleton from "../FooterSkeleton";

describe("FooterSkeleton", () => {
  it("check render component", () => {
    const { getByTestId } = render(<FooterSkeleton />);

    expect(getByTestId(/footerSkeleton/i)).toBeInTheDocument();
  });
});
