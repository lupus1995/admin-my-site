import { renderHook } from "@testing-library/react";
import { addDays, format, subDays } from "date-fns";

import { useDisableHidePublished } from "../hooks";

describe("hooks", () => {
  it("useDisableHidePublished return true by isDisabled", () => {
    const { result } = renderHook(() =>
      useDisableHidePublished({
        isInitForm: false,
        publishedAtValue: "",
        isDisabled: true,
      })
    );

    expect(result.current).toBe(true);
  });

  it("useDisableHidePublished return false by isInitForm", () => {
    const { result } = renderHook(() =>
      useDisableHidePublished({
        isInitForm: false,
        publishedAtValue: "",
        isDisabled: false,
      })
    );

    expect(result.current).toBe(false);
  });

  it("useDisableHidePublished return false by date", () => {
    const { result } = renderHook(() =>
      useDisableHidePublished({
        isInitForm: true,
        publishedAtValue: format(
          subDays(new Date(), 1),
          "yyyy-MM-dd'T'HH:mm:ss'Z'"
        ),
        isDisabled: false,
      })
    );

    expect(result.current).toBe(false);
  });

  it("useDisableHidePublished return true by date", () => {
    const { result } = renderHook(() =>
      useDisableHidePublished({
        isInitForm: true,
        publishedAtValue: format(
          addDays(new Date(), 1),
          "yyyy-MM-dd'T'HH:mm:ss'Z'"
        ),
        isDisabled: false,
      })
    );

    expect(result.current).toBe(true);
  });
});
