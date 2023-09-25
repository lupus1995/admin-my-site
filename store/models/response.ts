import { ValidationError } from "./validationError";

export interface IResponse<T> {
  errors: ValidationError[];
  data: T;
  status: number;
}
