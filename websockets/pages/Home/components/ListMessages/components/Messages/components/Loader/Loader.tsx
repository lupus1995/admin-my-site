import React, { FC } from "react";

export const Loader: FC<{ viewLoader: boolean }> = ({ viewLoader }) => (
  <>
    {viewLoader && (
      <div className="loader" key={0}>
        Loading ...
      </div>
    )}
  </>
);
