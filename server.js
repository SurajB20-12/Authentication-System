const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/authentication")
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));

app.use(authRoutes);

app.listen(PORT, () => {
  console.log("Server running");
});
