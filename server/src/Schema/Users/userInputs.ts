export const userInputs = `#graphql

input HairInput {
  color: String
  type: String
}

input CoordinatesInput {
  lat: Float
  lng: Float
}

input AddressInput {
  address: String!
  city: String!
  state: String!
  stateCode: String
  postalCode: String
  coordinates: CoordinatesInput
  country: String
}

input BankInput {
  cardExpire: String
  cardNumber: String
  cardType: String
  currency: String
  iban: String
}

input CompanyInput {
  department: String
  name: String
  title: String
  address: AddressInput
}

input CryptoInput {
  coin: String
  wallet: String
  network: String
}

input NewUserInput {
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
  hair: HairInput
  ip: String
  address: AddressInput
  macAddress: String
  university: String
  bank: BankInput
  company: CompanyInput
  ein: String
  ssn: String
  userAgent: String
  crypto: CryptoInput
  role: String
}
`
