import { useState } from "react";

import { t } from "i18next";
import { toast } from "react-toastify";

import { defaultOffset } from "pages/Page/Articles/constants";
import { ResponseI } from "utils/interfaces";

export interface PaginationI<
  T = unknown,
  S = unknown,
  P = Promise<ResponseI<unknown[] | void>>
> {
  params: Record<string, unknown>;
  request: (params: S) => P;
  limit: number;
  afterSaveResult: (result: T) => void;
}

export const usePagination = ({
  request,
  params,
  limit,
  afterSaveResult,
}: PaginationI) => {
  // offset равен 1, потому что на серевере запрашиваем первую очередь, то есть через ssr
  const [offset, setOffset] = useState<number>(defaultOffset);
  const [notVisibleButton, setNotVisibleButton] = useState<boolean>(false);

  const handleLoad = (): Promise<void> => {
    return request({ ...params, offset }).then((result) => {
      if (!result.status) {
        toast(t(result.message as string), {
          type: "error",
          hideProgressBar: true,
          theme: "colored",
        });
      }

      if (result.responseBody) {
        const length = result.responseBody.length;
        afterSaveResult(result.responseBody);

        if (length === limit) {
          setOffset(offset + 1);
        }

        if (length !== limit || length === 0) {
          setNotVisibleButton(true);
        }
      }
    });
  };

  return { notVisibleButton, handleLoad };
};
