export default `
  type Mutation {
    register(user: registerUser): RegisterSuccess!
  }

  input registerUser {
    name: MuName!
    email: String!
    gender: Gender!
    phone: String!
    birthdate: MuBirthdate!
    password: String!
    rePassword: String!
  }

  input MuBirthdate {
    day: Int!
    month: Int!
    year: Int!
  }

  input MuName {
    first: String!
    last: String!
  }

  enum Gender {
    male
    female
  }

  type RegisterSuccess {
    email: String!
    msg: String!
  }

`;
