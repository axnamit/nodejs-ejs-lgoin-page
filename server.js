const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const cors = require("cors");

const indexRouter = require("./routes/index");

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use(cookieParser());
app.use(
  session({
    secret: "positronx",
    saveUninitialized: false,
    resave: false,
  })
);

app.set("view engine", "ejs");
let dburl = "mongodb://127.0.0.1:27017/test-db";

const dbKeys = require("./config/config").mongoURI || dburl;
const port = process.env.SERVER_PORT || 3000;
console.log(port);
mongoose
  .connect(dbKeys, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));
app.use(express.static("public"));
//app.use(express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.listen(port, () => console.log("app is started at " + port));
