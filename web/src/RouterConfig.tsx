import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { PostCreate } from "./pages/PostCreate";

export const RouterConfig: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="posts">
          <Route index element={<Posts/>} />
          <Route path="create" element={<PostCreate/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}