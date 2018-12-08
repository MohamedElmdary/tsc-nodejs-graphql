import jwt from "jsonwebtoken";
import User from "../../configs/interfaces/User";
import configs from "../../configs/configs";

type loginUser = { user: { email: string; password: string } };

const Query = {
  async login(_: any, { user }: loginUser, { User }: any) {
    const oldUser: User | null = await User.findOne({ email: user.email });
    if (!oldUser) {
      throw new Error(
        JSON.stringify({
          msg: "Email or Password",
          user
        })
      );
    }
    if (oldUser.token) {
      try {
        jwt.verify(oldUser.token, configs.secret);
        return {
          token: oldUser.token,
          user: {
            _id: oldUser._id.toString(),
            name: oldUser.name,
            email: oldUser.email,
            gender: oldUser.gender,
            phone: oldUser.phone,
            birthdate: oldUser.birthdate
          }
        };
      } catch (e) {
        console.log("error:", e);
      }
    }
    const valid = await (<any>oldUser).validPassword(user.password);
    if (!valid) {
      throw new Error(
        JSON.stringify({
          msg: "Email or Password",
          user
        })
      );
    }
    const token = jwt.sign(
      {
        _id: oldUser._id.toString(),
        date: new Date().toISOString()
      },
      configs.secret,
      {
        expiresIn: "3h"
      }
    );
    (<any>oldUser).token = token;
    await (<any>oldUser).save();
    return await {
      token,
      user: {
        _id: oldUser._id.toString(),
        name: oldUser.name,
        email: oldUser.email,
        gender: oldUser.gender,
        phone: oldUser.phone,
        birthdate: oldUser.birthdate
      }
    };
  }
};

export default Query;
