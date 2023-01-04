import { useRef, useEffect, MutableRefObject } from "react";

export const usePrevious = (value: unknown) => {
  const ref: MutableRefObject<unknown> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
