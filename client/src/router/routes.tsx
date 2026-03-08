import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgetModule from "../pages/forgetmodule";
import Layout from "./Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="ForgetModule" element={<ForgetModule />} />
    </Route>,
  ),
);
