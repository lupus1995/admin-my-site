import { useCallback, useState } from "react";

export const useToggleModal = (): {
  toggleModal: boolean;
  closeModal: () => void;
  openModal: () => void;
} => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const closeModal = useCallback(() => setToggleModal(false), []);
  const openModal = useCallback(() => setToggleModal(true), []);

  return { toggleModal, closeModal, openModal };
};
