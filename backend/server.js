const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
//jwt

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port : ${process.env.PORT}`);
});
