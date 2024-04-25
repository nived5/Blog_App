import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./routes/Router";
import { PostDataProvider } from "./Context/PostContext";
import { UserDataprovider } from "./Context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <UserDataprovider>
        <PostDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Router />} />
            </Routes>
          </BrowserRouter>
        </PostDataProvider>
      </UserDataprovider>
      <ToastContainer />
    </>
  );
}
