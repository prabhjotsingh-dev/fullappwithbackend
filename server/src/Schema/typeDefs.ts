import { todoInputs } from "./Todos/todoInputs.js"
import { todoTypes } from "./Todos/todoTypes.js"
import { commanTypes } from "./comman/commanTypes.js"
import { userInputs } from "./Users/userInputs.js"
import { userTypes } from "./Users/userTypes.js"

const QueryAndMutation = `#graphql

type Query {
  users: [User]
  user(id: ID!): User
  todos: [Todo] 
  me: User
}
  
type Mutation {
  login(username: String!, password: String!): AuthPayload
  signup(input: NewUserInput!): User
  resetPassword(username: String!, email: String!, password: String!): String
  refreshToken(token: String!): AuthPayload
  addTodo(input: AddTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  deleteTodo(id: ID!): Boolean
}
`

export const typeDefs = [commanTypes, todoTypes, todoInputs, userTypes, userInputs, QueryAndMutation]