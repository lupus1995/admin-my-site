import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as redux from "react-redux";

import Feedback from "../Feedback";

fetchMock.enableMocks();

jest.mock("react-redux");

jest.mock("../../components/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn,
    }),
  };
});

jest.mock("pages/Admin/Feedback/api", () => {
  const mockModule = jest.requireActual("pages/Admin/Feedback/api");

  return {
    ...mockModule,
    getFeedback: jest
      .fn()
      .mockResolvedValue(new Promise((res) => res(jest.fn))),
  };
});

jest.mock("pages/Admin/Feedback/components", () => {
  const mockModule = jest.requireActual("pages/Admin/Feedback/components");

  return {
    ...mockModule,
    FeedbackTable: () => <span>FeedbackTable</span>,
    ModalFeedback: () => <span>ModalFeedback</span>,
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Feedback", () => {
  it("check render component", async () => {
    jest
      .spyOn(redux, "useDispatch")
      .mockReturnValue(jest.fn().mockResolvedValue(jest.fn));
    const { findByText } = render(<Feedback />);

    expect(await findByText("feedback")).toBeInTheDocument();
    expect(await findByText(/FeedbackTable/i)).toBeInTheDocument();
    expect(await findByText(/ModalFeedback/i)).toBeInTheDocument();
  });
});
