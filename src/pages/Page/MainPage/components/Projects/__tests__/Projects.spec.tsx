import React from "react";

import { render } from "@testing-library/react";

import { ContentI } from "pages/interface";

import { useInitProjects } from "../hooks";
import Projects from "../Projects";

jest.mock("utils/mediaQuery", () => ({
  useIsMediaQuery: () => ({
    is360: false,
    is480: false,
  }),
}));
jest.mock("../hooks");
jest.mock("pages/Page/components", () => {
  const mockModule = jest.requireActual("pages/Page/components");

  return {
    ...mockModule,
    ContentsContainer: () => <>ContentsContainer</>,
    ContentsContainerSkeleton: () => <>ContentsContainerSkeleton</>,
  };
});
jest.mock("pages/Page/components/Content/hooks", () => {
  const mockModule = jest.requireActual("pages/Page/components/Content/hooks");

  return {
    ...mockModule,
    useGetConents: (): ContentI[] => [],
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

describe("Projects", () => {
  it("check render component sceleton", () => {
    jest.mocked(useInitProjects).mockImplementation(() => ({
      projects: [],
      visibleSkeleton: true,
    }));
    const { getByText, queryByText } = render(<Projects />);

    expect(getByText("projectTitlePage")).toBeInTheDocument();
    expect(getByText(/ContentsContainerSkeleton/)).toBeInTheDocument();
    expect(queryByText("ContentsContainer")).not.toBeInTheDocument();
  });

  it("check render component", () => {
    jest.mocked(useInitProjects).mockImplementation(() => ({
      projects: [],
      visibleSkeleton: false,
    }));
    const { getByText, queryByText } = render(<Projects />);

    expect(getByText("projectTitlePage")).toBeInTheDocument();
    expect(queryByText(/ContentsContainerSkeleton/)).not.toBeInTheDocument();
    expect(getByText("ContentsContainer")).toBeInTheDocument();
  });
});
