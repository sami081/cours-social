const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 1024,
      minLength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },

    likes: {
      type: [String],
    },
    following: [{ type: ObjectId, ref: "user" }],
    followers: [{ type: ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

//play function before save into
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
