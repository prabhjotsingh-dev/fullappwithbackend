export const typeDefs = `#graphql
  type Todo {
  id: Int
  todo: String
  completed: Boolean
  userId: Int
}

type User {
  id: Int
  firstName: String
  lastName: String
  todos: [Todo]
}

type Query {
  users: [User]
  user(id: Int!): User
  todos: [Todo]
}`;
