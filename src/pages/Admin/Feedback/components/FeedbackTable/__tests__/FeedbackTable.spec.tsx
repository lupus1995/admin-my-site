import React from "react";

import { render } from "@testing-library/react";

import FeedbackTable from "../FeedbackTable";
import { FeedbackTableI } from "../inteface";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("FeedbackTable", () => {
  let baseProps: FeedbackTableI;
  beforeEach(() => {
    baseProps = {
      feedback: [
        {
          username: "username1",
          text: "text1",
          _id: "id 1",
        },
        {
          username: "username2",
          text: "text2",
          _id: "id 2",
        },
        {
          username: "username3",
          text: "text3",
          _id: "id 3",
        },
      ],
      selected: [
        {
          username: "username2",
          text: "text2",
          _id: "id 2",
        },
      ],
      setSelected: jest.fn,
    };
  });
  it("check render component with data", () => {
    const { getByText } = render(<FeedbackTable {...baseProps} />);

    expect(getByText(/feedbackName/i)).toBeInTheDocument();
    expect(getByText(/feedbackMessage/i)).toBeInTheDocument();

    expect(getByText(/username1/i)).toBeInTheDocument();
    expect(getByText(/username2/i)).toBeInTheDocument();
    expect(getByText(/username3/i)).toBeInTheDocument();

    expect(getByText(/text1/i)).toBeInTheDocument();
    expect(getByText(/text2/i)).toBeInTheDocument();
    expect(getByText(/text3/i)).toBeInTheDocument();
  });

  it("check render empty data", () => {
    const props: FeedbackTableI = {
      ...baseProps,
      feedback: [],
      selected: [],
    };

    const { getByText } = render(<FeedbackTable {...props} />);

    expect(getByText(/feedbackEmpty/i)).toBeInTheDocument();
  });
});
