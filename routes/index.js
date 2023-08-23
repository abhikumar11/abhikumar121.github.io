const express = require("express");
const routers = express.Router();
routers.use("/",require("./users"));
routers.use("/student", require("./students"));
routers.use("/interview", require("./interview"));

module.exports = routers;