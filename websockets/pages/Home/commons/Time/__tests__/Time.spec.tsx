import React from "react";

import { render } from "@testing-library/react";

import { getDate } from "../helpers";
import Time from "../Time";

describe("Time", () => {
  it("check render component", () => {
    const dateString = "2023-10-30T19:47:44.500+00:00";
    const time = getDate(dateString);
    const { getByText } = render(<Time date={dateString} />);

    expect(getByText(time)).toBeInTheDocument();
  });
});
