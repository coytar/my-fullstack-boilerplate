import { connect, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { AutoIncrementID } from "@typegoose/auto-increment";
import * as uuid from "uuid";

connect(process.env.DATABASE_URL);

const userSchema = new Schema(
  {
    user: Number,
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      immutable: true,
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String },
    firstName: { type: String, maxlength: 20 },
    lastName: { type: String, maxlength: 20 },
    bio: { type: String, maxlength: 240 },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date },
    role: { type: String },
    organisation: {
      type: String,
      default: function () {
        // Return a UUID as a hex string
        return uuid.v4().replace(/-/g, "");
      },
    },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

userSchema.virtual("fullName").get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  if (this.firstName && !this.lastName) {
    return this.firstName;
  }
  if (!this.firstName && this.lastName) {
    return this.lastName;
  }
  return undefined;
});

userSchema.virtual("initials").get(function () {
  return (
    this.firstName &&
    this.lastName &&
    `${this.firstName[0].concat(this.lastName[0]).toUpperCase()}`
  );
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

export const UserModel = model("user", userSchema, "user");
