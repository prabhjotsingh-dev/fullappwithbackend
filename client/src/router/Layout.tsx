import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <main className="h-screen flex flex-col overflow-hidden bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header>
        <Navbar />
      </header>
      <section className="flex-1 overflow-y-auto">
        <Outlet />
      </section>

      <footer className="px-4 py-3 border-t text-sm text-center">Todos manage your tasks efficiently</footer>
    </main>
  );
};

export default Layout;
