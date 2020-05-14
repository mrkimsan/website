
// Router's root is "/" so that I can also catch post-specific slugs

const { getLocale, getPosts } = require("../util");
const express = require("express");
const router = express.Router();

// General overview of all posts
router.get("/posts", (req, res) => {

	let locale = getLocale("us", "en");
	let posts = getPosts();

	res.render("posts", {
		locale,
		posts,
		showHero: false
	});
});

router.get("/:slug", (req, res, next) => {

	let locale = getLocale("us", "en");
	let posts = getPosts("blog");
	let post = posts.find(p => p.slug === req.params.slug);

	if(post) {
		res.render("post", {
			locale,
			post,
			posts: posts.filter(s => s.slug !== post.slug).slice(0, 3),
			showHero: false
		});
	} else {
		next();
	}
});

module.exports = router;