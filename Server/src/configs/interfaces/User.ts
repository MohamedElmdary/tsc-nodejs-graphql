export default interface User {
  _id: string;
  name: Name;
  email: string;
  gender: string;
  phone: string;
  birthdate: Birthdate;
  password: string;
  rePassword: string;
  token: string;
}

type Birthdate = {
  day: number;
  month: number;
  year: number;
};

type Name = {
  first: string;
  last: string;
};
