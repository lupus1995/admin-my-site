import React from "react";

import { render } from "@testing-library/react";

import { ItemPropsI } from "../interface";
import ItemList from "../ItemList";

describe("ItemList", () => {
  let initData: ItemPropsI;
  beforeEach(() => {
    initData = {
      src: "src",
      title: "title",
      description: "description",
    };
  });
  it("check render component", () => {
    const { getByTestId, getByText } = render(<ItemList {...initData} />);

    expect(getByText("title")).toBeInTheDocument();
    expect(getByText("description")).toBeInTheDocument();
    expect(getByTestId("src")).toBeInTheDocument();
  });
});
