import { books } from "../Data/data.js";

export const resolvers = {
  Query: {
    books: () => books,
  },
};
