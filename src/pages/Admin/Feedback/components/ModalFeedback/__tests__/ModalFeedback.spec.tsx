import React from "react";

import { fireEvent, render } from "@testing-library/react";

import { ModalFeedbackI } from "../interface";
import ModalFeedback from "../ModalFeedback";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useNavigate: () => jest.fn,
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
