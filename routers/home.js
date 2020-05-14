
const { getLocale, getPosts } = require("../util");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

	let locale = getLocale("us", "en");
	let posts = getPosts("blog");
	let projects = getPosts("projects");

	res.render("home", {
		locale,
		posts,
		projects,
		showHero: true
	});
});

module.exports = router;