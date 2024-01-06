import React from "react";

import { fireEvent, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { ModalFeedbackI } from "../interface";
import ModalFeedback from "../ModalFeedback";

fetchMock.enableMocks();
jest.mock("react-redux");

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: () => jest.fn,
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("ModalFeedback", () => {
  it("check render component with empty selected", () => {
    const props: ModalFeedbackI = {
      selected: [],
      handleClearFeedback: jest.fn,
    };

    const { container } = render(<ModalFeedback {...props} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("check empty with selected data", () => {
    const props: ModalFeedbackI = {
      selected: [
        {
          username: "username2",
          text: "text2",
          _id: "id 2",
        },
      ],
      handleClearFeedback: jest.fn,
    };

    const { getByText } = render(<ModalFeedback {...props} />);

    expect(getByText(/feedbackModalTitle/i)).toBeInTheDocument();
  });

  it("check open modal window", async () => {
    const props: ModalFeedbackI = {
      selected: [
        {
          username: "username2",
          text: "text2",
          _id: "id 2",
        },
      ],
      handleClearFeedback: jest.fn,
    };
    const { getByText, findByText } = render(<ModalFeedback {...props} />);

    fireEvent.click(getByText(/feedbackModalTitle/i));

    const deletedText = await findByText(/delete/i);

    expect(getByText(/feedbackModalSubtitle/i)).toBeInTheDocument();
    expect(deletedText).toBeInTheDocument();
    expect(getByText(/cancel/i)).toBeInTheDocument();
  });
});
