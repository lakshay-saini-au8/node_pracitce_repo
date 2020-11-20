const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const methodOverride = require("method-override");
const session = require("express-session");
const MonogoStore = require("connect-mongo")(session);
const path = require("path");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: __dirname + "/config/config.env" });

// passport config
require("./config/passport")(passport);

connectDB();
const app = express();
// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Handlebars
const {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
} = require("./helpers/hbs");
// Handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      truncate,
      stripTags,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
// should be above passport
// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MonogoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport middileware
app.use(passport.initialize());
app.use(passport.session());

// set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
// static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/story"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
