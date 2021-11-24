const express = require("express");
const pageRoute = require("./routes/pageRoute")
const mongoose = require("mongoose");
const session = require("express-session");
const courseRoute = require("./routes/courseRoute")
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

//Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
    
  })
  .then(() => {
    console.log("DB Connect success!");
  });

//Template engine
app.set("view engine", "ejs");

//global variables
global.userIN = null;


//Middlewares

app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
  })
);
//Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
