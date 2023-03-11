const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "config.env" });
require("./db/conn.js");
app.use(express.json());
const port = 5050;
app.use(require("./API/EmployeeCrud"));
app.use(require("./API/TaskCrud"));
app.listen(port, () => {
  console.log(`sever is running`);
});
