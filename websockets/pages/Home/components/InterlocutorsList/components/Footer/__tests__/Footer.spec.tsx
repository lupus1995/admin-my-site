import React from "react";

import { render } from "@testing-library/react";

import Footer from "../Footer";

describe("Footer", () => {
  it("check render component", () => {
    const { getByText } = render(<Footer handlePagination={jest.fn()} />);

    expect(getByText(/Загрузить еще/i)).toBeInTheDocument();
  });
});
