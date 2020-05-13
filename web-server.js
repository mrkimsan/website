const showdown = require("showdown");
const showdownConverter = new showdown.Converter;
const routers = require("./routers");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();


app.engine("handlebars", handlebars({
	defaultLayout: "main",
	helpers: {
		toSlug: str => encodeURIComponent(str.replace(/ /g, "-")),
		toHTML: str => showdownConverter.makeHtml(str)
	}
}));
app.set("view engine", "handlebars");

app.use("/", routers.home);
app.use("/", routers.posts);

app.use(express.static("public"));


module.exports = app;