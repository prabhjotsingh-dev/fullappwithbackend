import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import ForgetModule from "../pages/forgetmodule";
import Layout from "./Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgetpassword" element={<ForgetModule />} />
    </Route>,
  ),
);
