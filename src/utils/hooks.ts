import { useRef, useEffect, MutableRefObject } from "react";

// возвращает предыдущее значение переменной для которой задан текущий хук
export const usePrevious = (value: unknown) => {
  const ref: MutableRefObject<unknown> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
