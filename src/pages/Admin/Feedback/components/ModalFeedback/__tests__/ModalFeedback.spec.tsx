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

    expect(
      getByText(/Удалить выделенные записи с обратной связью?/i)
    ).toBeInTheDocument();
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
    const { getByText, findAllByText } = render(<ModalFeedback {...props} />);

    fireEvent.click(getByText(/Удалить выделенные записи/i));

    const deletedText = await findAllByText(/удалить/i);

    expect(
      getByText(
        /Вы действительно намерены удалить статью выделнные записи с обратной связью?/i
      )
    ).toBeInTheDocument();
    expect(deletedText[3]).toBeInTheDocument();
    expect(getByText(/Отмена/i)).toBeInTheDocument();
  });
});
