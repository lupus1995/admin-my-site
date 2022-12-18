import {
  FieldErrorsImpl,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form/dist/types";

export interface BlockImageInputI {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
  isSubmitted: boolean;
  trigger: UseFormTrigger<FieldValues>;
  name: string;
  label: string;
  isDisabled: boolean;
  disabledClass: string;
}
