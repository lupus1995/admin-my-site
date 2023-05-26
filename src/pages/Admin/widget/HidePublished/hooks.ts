import { useMemo } from "react";

import { isBefore } from "date-fns";

import { DisableHidePublished } from "./interfaces";

export const useDisableHidePublished = ({
  isInitForm,
  publishedAtValue,
  isDisabled,
}: DisableHidePublished) => {
  const isDisabledCheckbox = useMemo(() => {
    if (isInitForm) {
      const date = new Date(publishedAtValue);

      return isBefore(new Date(), date);
    }

    return false;
  }, [isInitForm, publishedAtValue]);

  const disabledCheckbox = useMemo(() => {
    if (isDisabled) {
      return true;
    }
    return isDisabledCheckbox;
  }, [isDisabled, isDisabledCheckbox]);

  return disabledCheckbox;
};
