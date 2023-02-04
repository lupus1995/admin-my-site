import React, { FC, useMemo } from "react";

import { isBefore } from "date-fns";
import {
  UseFormWatch,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form/dist/types";
import { useTranslation } from "react-i18next";

import AdminCheckbox from "commons/AdminCheckbox";

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

  return (
    <AdminCheckbox
      isDisabled={isDisabledCheckbox}
      disabledClass={isDisabled || isDisabledCheckbox ? disabledClass : ""}
      name="hidePublishedArticle"
      setValue={setValue}
      value={watch("hidePublishedArticle")}
      label={t("hidePublishedArticleLabel")}
    />
  );
};

export default HidePublishedArticle;
