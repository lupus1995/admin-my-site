import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Feedback from "../Feedback";

jest.mock("../../components/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn,
    }),
  };
});

jest.mock("pages/Admin/Feedback/api", () => {
  const module = jest.requireActual("pages/Admin/Feedback/api");

  return {
    ...module,
    getFeedback: jest
      .fn()
      .mockResolvedValue(new Promise((res) => res(jest.fn))),
  };
});

jest.mock("pages/Admin/Feedback/components", () => {
  const module = jest.requireActual("pages/Admin/Feedback/components");

  return {
    ...module,
    FeedbackTable: () => <span>FeedbackTable</span>,
    ModalFeedback: () => <span>ModalFeedback</span>,
  };
});

describe("Feedback", () => {
  it("check render component", async () => {
    const { findByText } = render(<Feedback />);

    expect(await findByText("feedback")).toBeInTheDocument();
    expect(await findByText(/FeedbackTable/i)).toBeInTheDocument();
    expect(await findByText(/ModalFeedback/i)).toBeInTheDocument();
  });
});
