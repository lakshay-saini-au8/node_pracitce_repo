const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");

require("dotenv").config({ path: __dirname + "/.env" });

// middleware
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
mongoose.connect(
  process.env.DB_ROUTE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port} port no. `));
