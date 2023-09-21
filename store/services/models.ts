export interface SignUpI {
  username: string;
  password: string;
  confirmPassoword: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ValidationError {
  /**
   * Object that was validated.
   *
   * OPTIONAL - configurable via the ValidatorOptions.validationError.target option
   */
  target?: Record<string, any>;
  /**
   * Object's property that hasn't passed validation.
   */
  property: string;
  /**
   * Value that haven't pass a validation.
   *
   * OPTIONAL - configurable via the ValidatorOptions.validationError.value option
   */
  value?: any;
  /**
   * Constraints that failed validation with error messages.
   */
  constraints?: {
    [type: string]: string;
  };
  /**
   * Contains all nested validation errors of the property.
   */
  children?: ValidationError[];
  /**
   * A transient set of data passed through to the validation result for response mapping
   */
  contexts?: {
    [type: string]: any;
  };
}

export interface IResponse<T> {
  errors: ValidationError[];
  data: T;
  status: number;
}
