
const { getLocale, getPosts, getInstagram } = require("../util");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

	let locale = getLocale("us", "en");
	let posts = getPosts("blog");
	let projects = getPosts("projects");
	let instagram = getInstagram();

	res.render("home", {
		locale,
		posts,
		projects,
		showHero: true,
		instagram
	});
});

module.exports = router;