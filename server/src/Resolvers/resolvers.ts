import { Users } from "../Data/Users.js";
import { Todos } from "../Data/Todos.js";
type TodosByUserArgs = {
  userId: number;
};

export const resolvers = {
  Query: {
    users: () => Users,
    user: (_: unknown, { id }: { id: number }) =>
      Users.find((user) => user.id === id),
    todos: () => Todos,
    todosByUser: (_: unknown, { userId }: TodosByUserArgs) => {
      return Todos.filter((todo) => todo.userId === userId);
    },
  },
  User: {
    todos: (parent: { id: number }) => {
      return Todos.filter((todo) => todo.userId === parent.id);
    },
  },
};
