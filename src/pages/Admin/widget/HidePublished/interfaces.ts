import { UseFormWatch, FieldValues, UseFormSetValue } from "react-hook-form";

export interface HidePublishedPropsI {
  watch: UseFormWatch<FieldValues>;
  isInitForm: boolean;
  disabledClass: string;
  setValue: UseFormSetValue<FieldValues>;
  isDisabled: boolean;

  name: string;
  label: string;

  publishedAtValue: string;
}

export interface DisableHidePublished {
  isInitForm: boolean;
  publishedAtValue: string;
  isDisabled: boolean;
}
