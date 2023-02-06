import { UseFormHandleSubmit, FieldValues } from "react-hook-form/dist/types";

import { FORM_POSITION_TYPE } from "./types";

export interface FormI {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  className?: string;
  formPosition: FORM_POSITION_TYPE;
  isCenter?: boolean;
}
