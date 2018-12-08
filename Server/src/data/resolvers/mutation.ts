import UserType from "../../configs/interfaces/User";
import { isEmail } from "validator";

const Mutation = {
  async register(_: any, { user }: { user: UserType }, { User }: any) {
    const errors = [];
    if (
      !(
        user.name &&
        user.name.first &&
        user.name.first.length > 1 &&
        user.name.first &&
        user.name.last.length > 1
      )
    ) {
      errors.push({ msg: "Invalid name" });
    }

    if (!isEmail(user.email)) {
      errors.push({ msg: "Invalid email" });
    }

    if (!/^(male|female)$/i.test(user.gender)) {
      errors.push({ msg: "Invalid gender" });
    }

    if (!(user.password.length > 5)) {
      errors.push({ msg: "Invalid password" });
    }

    if (!(user.password === user.rePassword)) {
      errors.push({ msg: "Passwords not match" });
    }

    if (
      !(
        +user.birthdate.day > 0 &&
        +user.birthdate.day < 32 &&
        +user.birthdate.month > 0 &&
        +user.birthdate.month < 13 &&
        +user.birthdate.year > 1950 &&
        +user.birthdate.year < new Date().getFullYear()
      )
    ) {
      errors.push({ msg: "Invalid birthdate" });
    }

    if (errors.length > 0)
      throw new Error(
        JSON.stringify({
          user,
          errors
        })
      );

    delete user.rePassword;
    const oldUser = await User.findOne({ email: user.email });
    if (oldUser)
      throw new Error(
        JSON.stringify({
          user,
          errors: ["User already exists"]
        })
      );
    const newUser = await new User({
      ...user
    }).save();
    return {
      email: newUser.email,
      msg: "Successfully Register"
    };
  }
};

export default Mutation;
