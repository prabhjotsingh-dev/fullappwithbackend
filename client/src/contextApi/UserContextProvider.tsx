import type { ILogin } from "../assets/Types";
import { useState, createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface TodoData {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
interface UserContextType {
  userData: ILogin | null;
  setUserData: Dispatch<SetStateAction<ILogin>>;
  todos: TodoData[];
  setTodos: Dispatch<SetStateAction<TodoData[]>>;
  logedin: boolean;
  setLogedin: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  todos: [],
  setTodos: () => {},
  logedin: false,
  setLogedin: () => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [logedin, setLogedin] = useState<boolean>(localStorage.getItem("accessToken") ? true : false);

  const [userData, setUserData] = useState<ILogin>({
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
  const [todos, setTodos] = useState<TodoData[]>([]);

  return <UserContext.Provider value={{ userData, setUserData, todos, setTodos, logedin, setLogedin }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
