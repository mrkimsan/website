
const { getLocale, getPosts } = require("../util");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

	let locale = getLocale("us", "en");
	let posts = getPosts();

	res.render("posts", {
		locale,
		posts,
		showHero: false
	});
});

module.exports = router;