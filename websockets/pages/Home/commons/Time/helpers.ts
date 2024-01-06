import { format } from "date-fns";

export const getDate = (date: string) => {
  return format(new Date(date), "HH:mm:ss dd.MM.yyyy");
};
