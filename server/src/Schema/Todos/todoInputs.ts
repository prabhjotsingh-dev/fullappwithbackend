export const todoInputs = `#graphql
input AddTodoInput {
  todo: String!
  completed: Boolean!
}

input UpdateTodoInput {
  id: ID!
  todo: String
  completed: Boolean
}

`