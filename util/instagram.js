
// Get instagram feed

const fetch = require("node-fetch");

let instagram = [];

async function updateFeed() {
	let url = "https://instagram.com/jipprogamer2006/";

	let igRes = await fetch(url);
	let igHTML = await igRes.text();

	let igParser = /<script type="text\/javascript">window._sharedData = (.*?)<\/script>/;
	let contentMatch = igHTML.match(igParser);
	let igData = contentMatch ? JSON.parse(contentMatch[1].slice(0, -1)) : null;

	// console.log(igData);
	let posts = [];
	try {
		posts = igData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
	} catch(err) {
		console.error("Failed to fetch Instagram date");
	}
	
	
	posts = posts.map(post => {
		let { display_url, edge_liked_by, accessibility_caption, shortcode, edge_media_to_caption } = post.node;
		return {
			likes: edge_liked_by.count,
			src: display_url,
			label: accessibility_caption,
			url: `https://instagram.com/p/${shortcode}/`,
			caption: edge_media_to_caption.edges[0].node.text
		};
	});
	
	instagram = posts;
}
updateFeed();
setInterval(updateFeed, 30 * 60 * 1e3);


module.exports = {
	getInstagram() {
		return instagram;
	}
}