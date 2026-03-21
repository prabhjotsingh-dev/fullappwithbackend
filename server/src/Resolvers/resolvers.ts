import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { requireAuth } from "../utils/authMiddleware.js";

const accessSecret = "accessSecret";
const refreshSecret = "refreshSecret";

const todosPath = path.join(process.cwd(), "src/Data/todos.json");
const usersPath = path.join(process.cwd(), "src/Data/users.json");

const readTodos = () => {
  return JSON.parse(fs.readFileSync(todosPath, "utf-8"));
};

const writeTodos = (todos: any) => {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
};

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
};
const writeUsers = (users: any) => {

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

}

export const resolvers = {
  Query: {
    users: (_: unknown, __: unknown, context: any) => {
      requireAuth(context);
      return readUsers();
    },

    user: (_: unknown, { id }: { id: number }, context: any) => {
      requireAuth(context);
      const users = readUsers();
      return users.find((u: any) => u.id === id);
    },

    todos: (_: unknown, __: unknown, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      return todos.filter((t: any) => t.userId === context.user.userId);
    },

    me: (_: unknown, __: unknown, context: any) => {
      requireAuth(context);
      const users = readUsers();
      return users.find((u: any) => u.id === context.user.userId);
    },
  },

  Mutation: {
    login: (_: unknown, { username, password }: any) => {
      const users = readUsers();

      const user = users.find((u: any) => u.username === username);

      if (!user) {
        throw new Error("user not found");
      }

      if (user.password !== password) {
        throw new Error("invalid password");
      }

      const accessToken = jwt.sign({ userId: user.id }, accessSecret, { expiresIn: "1m" });

      const refreshToken = jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: "1d" });

      return {
        accessToken,
        refreshToken,
      };
    },
    signup: (_: unknown, { input }: any, context: any) => {
      const users = readUsers();
      const user = users.find((u: any) => String(u.username) === String(input.username));
      const email = users.find((u: any) => String(u.email) === String(input.email));
      if (user) {
        return "userName already exist"
      }
      if (email) {
        return "email already exist"
      }

    },

    resetPassword: (_: unknown, { username, email, password }: { username: string, email: string, password: string }) => {
      const users = readUsers();

      const user = users.find((u: any) => String(u.username) === String(username));


      if (!user) {
        return "user name not found"
      } else {
        if (String(user.email) !== String(email)) {
          return "invalid email"
        }
        const userWithNewPassword = { ...user, password: password }
        const updatedUsers = users.map((u: any) => u.id === user.id ? userWithNewPassword : u);
        writeUsers(updatedUsers)
        return "Password reset successfully";
      }
    },

    refreshToken: (_: unknown, { token }: { token: string }) => {
      try {
        const decoded: any = jwt.verify(token, refreshSecret);

        const users = readUsers();
        const user = users.find((u: any) => u.id === decoded.userId);

        if (!user) {
          throw new Error("user not found");
        }

        const accessToken = jwt.sign({ userId: user.id }, accessSecret, { expiresIn: "60m" });
        const refreshToken = jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: "1d" });

        return {
          accessToken,
          refreshToken,
        };
      } catch (err) {
        throw new Error("Invalid or expired refresh token");
      }
    },

    addTodo: (_: unknown, { input }: any, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      const newTodo = {
        id: Date.now(),
        todo: input.todo,
        completed: input.completed,
        userId: context.user.userId,
      };

      todos.push(newTodo);

      writeTodos(todos);

      return newTodo;
    },

    updateTodo: (_: unknown, { input }: any, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      const index = todos.findIndex((t: any) => String(t.id) === String(input.id));

      if (index === -1) {
        throw new Error("todo not found");
      }

      if (todos[index].userId !== context.user.userId) {
        throw new Error("not authorized");
      }
      const { id, ...todoUpdatedValues } = input
      const updatedTodo = {
        ...todos[index],
        ...todoUpdatedValues
      };

      todos[index] = updatedTodo;

      writeTodos(todos);

      return updatedTodo;
    },

    deleteTodo: (_: unknown, { id }: { id: number | string }, context: any) => {
      requireAuth(context);
      const todos = readTodos();

      const todo = todos.find((t: any) => String(t.id) === String(id));

      if (!todo) {
        throw new Error("todo not found");
      }

      if (todo.userId !== context.user.userId) {
        throw new Error("not authorized");
      }

      const filteredTodos = todos.filter((t: any) => String(t.id) !== String(id));

      writeTodos(filteredTodos);

      return true;
    },
  },

  User: {
    todos: (parent: any, _: unknown, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      return todos.filter((t: any) => t.userId === parent.id);
    },
  },
};
