import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { UserContextProvider } from "../contextApi/UserContextProvider";

const Layout = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
    </UserContextProvider>
   
  );
};

export default Layout;
