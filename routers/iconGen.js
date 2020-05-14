
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log(req.query)
	res.render("icon-gen", {
		layout: false,
		color: req.query.color,
		url: req.query.url
	});
});

module.exports = router;