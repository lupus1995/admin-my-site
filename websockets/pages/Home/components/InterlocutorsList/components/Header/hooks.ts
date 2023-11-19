import { useAppDispatch } from "store/hooks";
import { useSetSearch } from "websockets/entities/Users";

export const useHandleSearchValue = () => {
  const dispatch = useAppDispatch();
  const setSearch = useSetSearch();
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return { handleClick };
};
