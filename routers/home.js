
const { getLocale } = require("../util");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

	let locale = getLocale("us", "en");

	res.render("home", {
		locale
	});
});

module.exports = router;