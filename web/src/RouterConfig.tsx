import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { PostCreate } from "./pages/PostCreate";
import { PostDetail } from "./pages/PostDetail";
import { PostEdit } from "./pages/PostEdit";

export const RouterConfig: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="posts">
          <Route index element={<Posts/>} />
          <Route path="create" element={<PostCreate/>} />
          {/* <Route path=":id" element={<PostDetail />} />
          <Route path=":id/edit" element={<PostEdit/>} /> */}
          <Route path=":id">
            <Route index element={<PostDetail />} />
            <Route path="edit" element={<PostEdit/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}