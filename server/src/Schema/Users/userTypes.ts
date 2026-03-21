export const userTypes = `#graphql

type User {
  id: ID!
  firstName: String!
  lastName: String
  maidenName: String
  age: Int!
  gender: String!
  email: String!
  phone: String!
  username: String!
  password: String!
  birthDate: String!
  image: String
  bloodGroup: String
  height: Float
  weight: Float
  eyeColor: String
  hair: Hair
  ip: String
  address: Address
  macAddress: String
  university: String
  bank: Bank
  company: Company
  ein: String
  ssn: String
  userAgent: String
  crypto: Crypto
  role: String
  todos: [Todo]
}

type Hair {
  color: String
  type: String
}

type Address {
  address: String!
  city: String!
  state: String!
  stateCode: String
  postalCode: String
  coordinates: Coordinates
  country: String
}

type Coordinates {
  lat: Float
  lng: Float
}

type Bank {
  cardExpire: String
  cardNumber: String
  cardType: String
  currency: String
  iban: String
}

type Company {
  department: String
  name: String
  title: String
  address: Address
}

type Crypto {
  coin: String
  wallet: String
  network: String
}
`