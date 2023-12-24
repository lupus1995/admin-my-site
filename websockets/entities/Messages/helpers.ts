import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { ResponseMessageI } from "./types";

export function isMessage(
  result:
    | {
        data: ResponseMessageI;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      }
): result is {
  data: ResponseMessageI;
} {
  return (<
      {
        data: ResponseMessageI;
      }
    >result).data !== undefined;
}
