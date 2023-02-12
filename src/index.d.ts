/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    cloudinary: any;
    gtag: (...args: any[]) => void;
  }
}

declare module "*.woff";
declare module "*.woff2";
