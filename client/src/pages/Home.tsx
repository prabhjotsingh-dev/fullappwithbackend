import { useNavigate } from "react-router";
import { UserContext } from "../contextApi/UserContextProvider";
import { useContext, useEffect, useState } from "react";
import { Item, ItemContent } from "../components/ui/item";
import CustomDilogbox from "../components/CustomDilogbox";
import { GetUserTodos } from "../api/api";
import { Checkbox } from "../components/ui/checkbox";
import { GetUserDetails } from "../api/api";
import { Spinner } from "../components/ui/spinner";

const Home = () => {
  const navigator = useNavigate();
  const { todos, setTodos, userData } = useContext(UserContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken") || userData?.accessToken || "";
      const refreshToken = localStorage.getItem("refreshToken") || userData?.accessToken || "";
      const tokens = accessToken || refreshToken;

      if (!tokens) {
        navigator("/login");
        setLoading(false);
        return;
      }

      try {
        const user = await GetUserDetails(accessToken, refreshToken);
        if (!user || typeof user.id !== "number") {
          navigator("/login");
          return;
        }

        const userTodos = await GetUserTodos(user.id);
        setTodos(userTodos.todos ?? []);
      } catch {
        console.log("error");
        navigator("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Loading your data</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 h-full w-full items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <h1 className="font-bold text-2xl">Todos List</h1>
      <div className="flex w-full max-w-xl flex-col gap-6">
        {todos.map((todo) => (
          <Item variant={"outline"} key={`todo-${todo.id}`}>
            <ItemContent className={todo.completed ? "line-through" : ""}>{todo.todo}</ItemContent>
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => {
                setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
              }}
            />
            <CustomDilogbox id={todo.id} Trigger={"Edit"} Title={"Edit Todo"} Deccription={"Edit your todo"} />
            <CustomDilogbox
              id={todo.id}
              Trigger={"Delete"}
              Title={"Delete Todo"}
              Deccription={"Are you sure you want to delete this todo?"}
              hideinput={true}
            />
          </Item>
        ))}
      </div>
      <Item variant={"outline"} className="max-w-30">
        <CustomDilogbox id={"new"} Trigger={"Add New Todo"} Title={"Add New Todo"} Deccription={"Add new todo to your list"} />
      </Item>
    </section>
  );
};

export default Home;
