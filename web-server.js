const showdown = require("showdown");
showdown.setFlavor("github");
const showdownConverter = new showdown.Converter();
const routers = require("./routers");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.set("trust proxy", true);

app.engine("handlebars", handlebars({
	defaultLayout: "main",
	helpers: {
		toSlug: str => encodeURIComponent(str.replace(/ /g, "-")),
		toHTML: str => {
			let html = showdownConverter.makeHtml(str);
			html = html.replace(/<a/g, `<a target="_blank"`).replace(/<img/g, `<img loading="lazy"`);
			return html;
		},
		getHighlightJs: body => {
			if(body.includes(`\`\`\``)) { // Awesome check, huh
				return `
				<link rel="stylesheet" href="/assets/atom-one-light.css">
				  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
				  <script>hljs.initHighlightingOnLoad();</script>
				`
			}
			return "";
		},
		genSocialImg: url => {
			return url.startsWith("http") ? url : `https://jipfr.nl${url}`;
		}
	}
}));
app.set("view engine", "handlebars");

app.use("/", routers.home);
app.use("/", routers.posts);
app.use("/", routers.projects);
app.use("/icon-gen", routers.iconGen);


app.use(express.static("public"));
app.use(express.static("../jipfr.nl/"))


app.use("*", routers.notFound);

module.exports = app;