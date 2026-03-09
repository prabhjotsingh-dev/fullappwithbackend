import { router } from "./router/routes";
import { RouterProvider } from "react-router/dom";
import UserContextProvider from "./contextApi/UserContextProvider";
import { ThemeProvider } from "./contextApi/themeProvider";

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
