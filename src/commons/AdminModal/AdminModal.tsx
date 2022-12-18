import React, { FC } from "react";

import Modal from "react-modal";

// Modal.setAppElement("#modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AdminModal: FC<{ open: boolean }> = ({ open, children }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={open}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default AdminModal;
