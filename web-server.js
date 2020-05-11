const routers = require("./routers");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();


app.engine("handlebars", handlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use("/", routers.home);

app.use(express.static("public"));


module.exports = app;