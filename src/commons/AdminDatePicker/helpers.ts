import { isValid, parseISO } from "date-fns";

export const prepareDate = (date: string) => {
  if (isValid(parseISO(date))) {
    return new Date(date);
  }

  return null;
};
