export enum Modules {
  BLOG = "blog",
  WEBSOCKETS = "websockets",
  ADMIN_BLOG = "adminBlog",
}
export type ModuleType = Modules.BLOG | Modules.WEBSOCKETS | Modules.ADMIN_BLOG;
