export default `
  type Query {
    login(user: loginUser): loginReturn!
  }

  type loginReturn {
    token: String!
    user: User!
  }

  input loginUser {
    email: String!
    password: String!
  }

  type User {
    _id: String!
    name: QuName!
    email: String!
    gender: Gender!
    phone: String!
    birthdate: QuBirthdate!
  }

  type QuName {
    first: String!
    last: String!
  }

  type QuBirthdate {
    day: Int!
    month: Int!
    year: Int!
  }
`;
