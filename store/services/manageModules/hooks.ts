import { useAppDispatch, useAppSelector } from "store/hooks";

import { moduleSelector, setModule } from "./modulesSlice";
import { Modules } from "./types";

export const useSetBlogModule = () => {
  const dispatch = useAppDispatch();

  dispatch(setModule(Modules.BLOG));
};

export const useSetWebsocketsModule = () => {
  const dispatch = useAppDispatch();

  dispatch(setModule(Modules.WEBSOCKETS));
};

export const useSetAdminBlogModule = () => {
  const dispatch = useAppDispatch();

  dispatch(setModule(Modules.ADMIN_BLOG));
};

export const useGetModuleName = () => {
  const moduleName = useAppSelector(moduleSelector);

  return moduleName;
};
