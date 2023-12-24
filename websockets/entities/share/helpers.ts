import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { MessageI } from "../share/types";

export function isError(
  result:
    | {
        data: MessageI;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      }
): result is {
  error: FetchBaseQueryError | SerializedError;
} {
  return (<
      {
        error: FetchBaseQueryError | SerializedError;
      }
    >result).error !== undefined;
}
