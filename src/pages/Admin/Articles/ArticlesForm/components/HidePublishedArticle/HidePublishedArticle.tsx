import React, { FC, useMemo } from "react";

import { isBefore } from "date-fns";
import {
  UseFormWatch,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form/dist/types";
import { useTranslation } from "react-i18next";

import { AdminCheckbox } from "pages/Admin/components";

const HidePublishedArticle: FC<{
  watch: UseFormWatch<FieldValues>;
  isInitForm: boolean;
  disabledClass: string;
  setValue: UseFormSetValue<FieldValues>;
  isDisabled: boolean;
}> = ({ watch, isInitForm, disabledClass, setValue, isDisabled }) => {
  const { t } = useTranslation();
  const publishedAt = watch("publishedAt");
  const isDisabledCheckbox = useMemo(() => {
    if (isInitForm) {
      const date = new Date(publishedAt);

      return isBefore(new Date(), date);
    }

    return false;
  }, [isInitForm, publishedAt]);

  const disabledCheckbox = useMemo(() => {
    if (isDisabled) {
      return true;
    }
    return isDisabledCheckbox;
  }, [isDisabled, isDisabledCheckbox]);

  return (
    <AdminCheckbox
      isDisabled={disabledCheckbox}
      disabledClass={disabledCheckbox ? disabledClass : ""}
      name="hidePublishedArticle"
      setValue={setValue}
      value={watch("hidePublishedArticle")}
      label={t("hidePublishedArticleLabel")}
    />
  );
};

export default HidePublishedArticle;
