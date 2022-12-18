import React from "react";

import { render } from "@testing-library/react";

import MessageForEmptyList from "../MessageForEmptyList";

describe("MessageForEmptyList", () => {
  it("check render component", () => {
    const { getByText } = render(
      <MessageForEmptyList message="MessageForEmptyList" />
    );

    expect(getByText(/MessageForEmptyList/i)).toBeInTheDocument();
  });
});
