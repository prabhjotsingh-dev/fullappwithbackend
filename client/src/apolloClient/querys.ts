import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const getTodos = gql`
  query GetTodos {
    todos {
      id
      todo
      completed
    }
  }
`;

export const addTodoMutation = gql`
  mutation AddTodo($input: AddTodoInput!) {
    addTodo(input: $input) {
      id
      todo
      completed
    }
  }
`;

export const updateTodoMutation = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      todo
      completed
    }
  }
`;

export const deleteTodoMutation = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
export const refreshTokenMutation = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;
export const resetPasswordMutation = gql`
  mutation ResetPassword($username: String!, $email: String!, $password: String!) {
    resetPassword(username: $username, email: $email, password: $password)
  }
`;
export const getCurrentUser = gql`
  query GetMe {
    me {
    id
    firstName
    lastName
    maidenName
    age
    gender
    email
    phone
    username
    birthDate
    image
    bloodGroup
    height
    weight
    eyeColor
    hair {
      color
      type
    }
    address {
      address
      city
      state
      stateCode
      postalCode
      country
      coordinates {
        lat
        lng
      }
    }
    bank {
      cardExpire
      cardType
      currency
      iban
    }
    company {
      department
      name
      title
      address {
        city
        state
        country
      }
    }
    crypto {
      coin
      wallet
      network
    }
    role
  }
}
`;