import React, { FC } from "react";

import Modal from "react-modal";

import { AdminBody, AdminFooter, AdminHeader } from "./components";
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

const AdminModal: FC<{
  open: boolean;
  handleClose: () => void;
  handleCallback: () => void;
  children: React.ReactNode;
}> = ({ open, handleClose, handleCallback, children }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={open}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <AdminHeader handleClose={handleClose} />
      <AdminBody>{children}</AdminBody>
      <AdminFooter handleClose={handleClose} handleCallback={handleCallback} />
    </Modal>
  );
};

export default AdminModal;
