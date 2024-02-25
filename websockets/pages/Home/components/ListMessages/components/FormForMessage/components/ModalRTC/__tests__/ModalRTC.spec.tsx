import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { ModalRTC } from "../ModalRTC";

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
    useWebRTC: jest.fn().mockReturnValue({
      userVideo: {
        current: null,
      },
      interlocutorVideo: {
        curren: null,
      },
      userStream: {
        current: null,
      },
      callUser: jest.fn(),
      onVolume: false,
    }),
  };
});

jest.mock("../components", () => {
  const mockModule = jest.requireActual("../components");

  return {
    ...mockModule,
    FooterModalRTC: () => <>FooterModalRTC</>,
  };
});

jest.mock("primereact/dialog", () => {
  const mockModule = jest.requireActual("primereact/dialog");

  return {
    ...mockModule,
    Dialog: ({
      header,
      footer,
      children,
    }: {
      header: string;
      footer: JSX.Element;
      children: ReactNode;
    }) => (
      <>
        <p>{header}</p>
        {children}
        <p>{footer}</p>
      </>
    ),
  };
});

describe("ModalRTC", () => {
  it("render component", () => {
    const { getByText, getByTestId } = render(
      <ModalRTC handleClose={jest.fn} />
    );

    expect(getByText(/header/i)).toBeInTheDocument();
    expect(getByText(/FooterModalRTC/i)).toBeInTheDocument();
    expect(getByTestId(/userVideo/i)).toBeInTheDocument();
    expect(getByTestId(/interlocutorVideo/i)).toBeInTheDocument();
  });
});
