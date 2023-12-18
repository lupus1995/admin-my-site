import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { MessageI } from "../share/types";

export function isMessage(
  result:
    | {
        data: MessageI;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      }
): result is {
  data: MessageI;
} {
  return (<
      {
        data: MessageI;
      }
    >result).data !== undefined;
}

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
