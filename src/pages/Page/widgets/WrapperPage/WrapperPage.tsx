import React, { FC, ReactNode } from "react";

import { Footer } from "commons/Footer";
import { Header } from "pages/Page/components";

import useStyle from "./style";

const WrapperPage: FC<{ children: ReactNode }> = ({ children }) => {
  const style = useStyle();

  return (
    <>
      <Header />
      <div className={style.wrapperPage}>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default WrapperPage;
