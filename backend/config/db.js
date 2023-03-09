const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://" +
        process.env.DB_USER_PASS +
        "@cluster0.zs1ytra.mongodb.net/cours-social"
    );
    console.log("Connected to mongoDB");
  } catch {
    (err) => console.log("Failled to connect", err);
  }
};

module.exports = connectDB
