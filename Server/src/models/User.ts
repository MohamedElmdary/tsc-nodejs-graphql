import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const dateSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      set: function(v: number) {
        return Math.floor(v);
      },
      validate: {
        validator(v: any): boolean {
          return v > 0 && v < 32;
        }
      }
    },
    month: {
      type: Number,
      required: true,
      set: function(v: number) {
        return Math.floor(v);
      },
      validate: {
        validator(v: any): boolean {
          return v > 0 && v < 13;
        }
      }
    },
    year: {
      type: Number,
      required: true,
      set: function(v: number) {
        return Math.floor(v);
      },
      validate: {
        validator(v: any): boolean {
          return v > 1950 && v < <number>new Date().getFullYear();
        }
      }
    }
  },
  {
    _id: false
  }
);

const nameSchema = new mongoose.Schema(
  {
    first: {
      type: String,
      required: true,
      lowercase: true,
      trime: true,
      minlength: 2
    },
    last: {
      type: String,
      required: true,
      lowercase: true,
      trime: true,
      minlength: 2
    }
  },
  {
    _id: false
  }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true,
      trim: true,
      lowercase: true
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
      trim: true,
      lowercase: true,
      match: /male|female/i
    },
    name: nameSchema,
    phone: {
      type: String,
      validate: {
        validator(v: any): boolean {
          let valid = v.length === 11 && /^\d+$/.test(v);
          return valid;
        }
      }
      // unique: true, user can make to different accounts with same phone
    },
    birthdate: dateSchema,
    password: {
      type: String,
      required: true,
      set: function(v: string) {
        return bcrypt.hashSync(v, 12);
      }
    },
    token: {
      type: String,
      required: false
    },
    rules: {
      tpye: Array,
      required: false
    },
    changePassword: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    autoIndex: false,
    versionKey: false,
    strict: true,
    useNestedStrict: true
  }
);

userSchema.methods.validPassword = async function(
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("user", userSchema);
