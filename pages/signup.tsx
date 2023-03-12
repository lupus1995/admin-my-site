import React from "react";

import SignUp from "../src/pages/Admin/SignUp";

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/signin",
      permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
    },
  };
};

const Index = () => {
  return <SignUp />;
};

export default Index;
