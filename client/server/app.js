const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const app = express();

const users = require("./router/users");
const login = require("./router/login");
const resetPassword = require("./router/resetPassword");

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/users", users);
app.use("/auth", login);
app.use("/resetPassword", resetPassword);

const PORT = 3125;
app.listen(PORT, () => console.log(`listening to the port ${PORT}`));
