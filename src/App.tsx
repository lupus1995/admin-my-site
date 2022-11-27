import React from "react";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Articles, Home, SignIn, SignUp } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./resetDefaultStylesBrowsers.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/articles" element={<Articles />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
