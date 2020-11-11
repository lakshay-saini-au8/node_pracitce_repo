const express = require("express");
const app = express();
require("dotenv").config({ path: __dirname + "/.env" });
const mongooes = require("mongoose");

const postsRoute = require("./routes/posts");
app.use(express.json());
app.use("/posts", postsRoute);
// ROUTES
app.get("/", (req, res) => {
  res.send("we are at home");
});

mongooes.connect(
  process.env["DB_CON"],
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
// listening to the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listenin at port no. ${port}`));
