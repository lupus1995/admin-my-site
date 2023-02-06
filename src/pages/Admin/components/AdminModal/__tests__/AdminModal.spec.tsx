import React from "react";

import { render } from "@testing-library/react";

import AdminModal from "../AdminModal";

jest.mock("../components", () => {
  const module = jest.requireActual("../components");

  return {
    ...module,
    AdminFooter: () => <span>AdminFooter</span>,
    AdminHeader: () => <span>AdminHeader</span>,
  };
});

describe("AdminModal", () => {
  it("check render open modal", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    const { getByText } = render(
      <AdminModal handleCallback={jest.fn()} handleClose={jest.fn()} open>
        содержимое модального окна
      </AdminModal>
    );

    expect(getByText(/содержимое модального окна/i)).toBeInTheDocument();
    expect(getByText(/AdminFooter/i)).toBeInTheDocument();
    expect(getByText(/AdminHeader/i)).toBeInTheDocument();
  });

  it("check render close modal", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    const { queryByText } = render(
      <AdminModal
        handleCallback={jest.fn()}
        handleClose={jest.fn()}
        open={false}
      >
        содержимое модального окна
      </AdminModal>
    );

    expect(queryByText(/содержимое модального окна/i)).not.toBeInTheDocument();
    expect(queryByText(/AdminFooter/i)).not.toBeInTheDocument();
    expect(queryByText(/AdminHeader/i)).not.toBeInTheDocument();
  });
});
