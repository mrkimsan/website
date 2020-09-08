
// Router's root is "/" so that I can also catch post-specific slugs

const { getLocale, getPosts } = require("../util");
const express = require("express");
const router = express.Router();

// General overview of all posts
router.get("/projects", (req, res) => {

	let locale = getLocale("us", "en");
	let projects = getPosts("projects");

	res.render("projects", {
		locale,
		projects,
		showHero: false,
		title: "Projects"
	});
});

router.get("/:slug", (req, res, next) => {

	let locale = getLocale("us", "en");
	let projects = getPosts("projects");
	let project = projects.find(p => p.slug.toLowerCase() === req.params.slug.toLowerCase());

	if(project) {
		res.render("project", {
			locale,
			project,
			projects: projects.filter(s => s.slug !== project.slug).slice(0, 3),
			showHero: false,
			title: project.title,
			banner: project.banner || null
		});
	} else {
		next();
	}
});

module.exports = router;