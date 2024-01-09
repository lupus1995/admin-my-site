import { useGetTypeTextEditorQuery } from "./service";

export const useGetTypeEditor = () => {
  const { data, status, error } = useGetTypeTextEditorQuery();

  return { data, status, error };
};
