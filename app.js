const express = require("express");
const pageRoute = require("./routes/pageRoute")
const mongoose = require("mongoose");
const courseRoute = require("./routes/courseRoute")

const app = express();

//Connect DB
mongoose.connect("mongodb://localhost/smartedu-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
  console.log("DB Connect success!");
})

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
