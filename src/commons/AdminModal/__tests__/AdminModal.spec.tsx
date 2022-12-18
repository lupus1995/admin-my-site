import React from "react";

import { render } from "@testing-library/react";

import AdminModal from "../AdminModal";

describe("AdminModal", () => {
  it("check render open modal", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    const { getByText } = render(
      <AdminModal open>содержимое модального окна</AdminModal>
    );

    expect(getByText(/содержимое модального окна/i)).toBeInTheDocument();
  });

  it("check render close modal", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    const { queryByText } = render(
      <AdminModal open={false}>содержимое модального окна</AdminModal>
    );

    expect(queryByText(/содержимое модального окна/i)).not.toBeInTheDocument();
  });
});
