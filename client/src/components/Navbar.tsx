import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contextApi/themeProvider";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contextApi/UserContextProvider";

const Navbar = () => {
  const navigator = useNavigate();

  const { setUserData, logedin, setLogedin } = useContext(UserContext);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const Logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("image");
    localStorage.removeItem("userInfo");
    setLogedin(false);
    setUserData({
      accessToken: "",
      email: "",
      firstName: "",
      gender: "male",
      id: 0,
      image: "",
      lastName: "",
      refreshToken: "",
      username: "",
      password: "",
    });
    navigator("/login");
  };
  const navLinks = logedin
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/Dashboard" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Signup", path: "/Signup" },
        { name: "Login", path: "/Login" },
      ];

  return (
    <nav className="bg-linear-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="shrink-0">
          <NavLink to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition">
            Todo App
          </NavLink>
        </div>
        <div className="flex gap-5">
          <div className="md:flex space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  ` px-4 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActive ? "bg-white text-blue-600 font-semibold" : "text-white hover:bg-blue-700 hover:text-white"
                  }`
                }>
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              onClick={Logout}
              className={`${logedin ? "" : "hidden"} px-4 py-2 rounded-md text-sm font-medium transition duration-300 bg-transparent text-white hover:bg-blue-700 hover:text-white`}>
              Logout
            </Button>
            <Button variant="outline" size="icon-sm" onClick={toggleTheme} className="relative">
              <Sun className="h-4 w-4 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
