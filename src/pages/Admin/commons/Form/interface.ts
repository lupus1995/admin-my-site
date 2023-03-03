import { UseFormHandleSubmit, FieldValues } from "react-hook-form/dist/types";

import { FORM_POSITION_TYPE } from "./types";

export interface FormI<T = null> {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: T) => void;
  className?: string;
  formPosition: FORM_POSITION_TYPE;
  isCenter?: boolean;
}
