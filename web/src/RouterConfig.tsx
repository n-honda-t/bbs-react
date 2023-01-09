import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";


export const RouterConfig: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="posts">
          <Route index element={<>posts</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}