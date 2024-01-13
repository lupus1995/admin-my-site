import React from "react";

import { render } from "@testing-library/react";

import { ItemPropsI } from "../interface";
import ItemList from "../ItemList";

jest.mock("pages/Page/commons", () => {
  const moduleMock = jest.requireActual("pages/Page/commons");

  return {
    ...moduleMock,
    CustomImage: () => <span>CustomImage</span>,
  };
});

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
    const { getByText } = render(<ItemList {...initData} />);

    expect(getByText("title")).toBeInTheDocument();
    expect(getByText("description")).toBeInTheDocument();
    expect(getByText(/CustomImage/i)).toBeInTheDocument();
  });
});
