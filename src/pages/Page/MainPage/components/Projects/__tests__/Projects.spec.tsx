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
  const module = jest.requireActual("pages/Page/components");

  return {
    ...module,
    ContentsContainer: () => <>ContentsContainer</>,
    ContentsContainerSkeleton: () => <>ContentsContainerSkeleton</>,
  };
});
jest.mock("pages/Page/components/Content/hooks", () => {
  const module = jest.requireActual("pages/Page/components/Content/hooks");

  return {
    ...module,
    useGetConents: (): ContentI[] => [],
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
