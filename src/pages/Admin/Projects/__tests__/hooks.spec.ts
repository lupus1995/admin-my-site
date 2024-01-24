import { renderHook } from "@testing-library/react";

import { useInitFormProjects, useProjectModal, useSaveProject } from "../hooks";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest.fn().mockReturnValue({ language: "ru", t: jest.fn() }),
  };
});

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      query: {
        id: null,
      },
    }),
  };
});

jest.mock("store/hooks", () => {
  const mockModule = jest.requireActual("store/hooks");

  return {
    ...mockModule,
    useAppDispatch: jest.fn().mockResolvedValue({ status: true }),
  };
});

describe("hooks", () => {
  it("useSaveProject", () => {
    const { result } = renderHook(() =>
      useSaveProject({ setIsDisabled: jest.fn() })
    );

    expect(typeof result.current === "function").toBeTruthy();
  });

  it("useInitFormProjects", () => {
    const { result } = renderHook(() =>
      useInitFormProjects({ register: jest.fn(), setValue: jest.fn() })
    );

    expect(typeof result.current === "boolean").toBeTruthy();
  });

  it("useProjectModal", () => {
    const { result } = renderHook(() =>
      useProjectModal({ projects: [], setProjects: jest.fn() })
    );

    const {
      toggleModal,
      handleOpenModal,
      handleCloseModal,
      handleDeletedProject,
      deletedProject,
    } = result.current;

    expect(typeof toggleModal === "boolean").toBeTruthy();
    expect(typeof handleOpenModal === "function").toBeTruthy();
    expect(typeof handleCloseModal === "function").toBeTruthy();
    expect(typeof handleDeletedProject === "function").toBeTruthy();
    expect(typeof deletedProject === "object").toBeTruthy();
  });
});
