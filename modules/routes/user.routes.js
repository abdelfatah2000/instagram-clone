const app = require("express").Router();
const controller = require("../controllers/user.controllers");

app.post("/register", controller.register);

module.exports = app;