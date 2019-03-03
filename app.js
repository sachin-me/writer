const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const port = 8000;

mongoose.connect(
 "mongodb://localhost/writer",
 { useNewUrlParser: true },
 function(err, connection) {
  if (err) throw err;
  else console.log("connected to mongodb");
 }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const User = require('./server/models/User');

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

app.use(
 session({
  secret: "writer",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: "mongodb://localhost/writer-session" })
 })
);

// Applying middleware

app.use(passport.initialize());
app.use(passport.session());

require('./server/modules/passport')(passport);

if (process.env.NODE_ENV === "development") {
 var webpack = require("webpack");
 var webpackConfig = require("./webpack.config");
 var compiler = webpack(webpackConfig);

 app.use(
  require("webpack-dev-middleware")(compiler, {
   noInfo: true,
   publicPath: webpackConfig.output.publicPath
  })
 );

 app.use(require("webpack-hot-middleware")(compiler));
}

app.use(cors());

app.use("/api", require("./server/routes/api"));
const iRouter = require('./server/routes/index');
const indexRoute = iRouter.router
app.use(indexRoute);

app.listen(port, () => {
 console.log(`server is running on http://localhost:${port}`);
});