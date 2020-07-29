
const { getLocale, getPosts } = require("../util");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	let locale = getLocale("us", "en");
	res.render("not-found", {
		showHero: true,
		locale
	});
});

module.exports = router;