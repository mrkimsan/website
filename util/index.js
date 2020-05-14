
const fs = require("fs");

const postsPath = "data/posts/";

module.exports.getLocale = (lang, variant) => {
	let path = `./locales/${lang.toLowerCase()}_${variant.toLowerCase()}.json`;
	let locale;
	if(fs.existsSync(path)) locale = JSON.parse(fs.readFileSync(path, "utf-8"));
	return locale || null;
}

module.exports.getPosts = (category = "blog") => {
	let posts = [];
	let postFileNames = fs.readdirSync(postsPath + category);

	postFileNames = postFileNames.filter(name => name.includes(".json"));

	for(let fileName of postFileNames) {
		let path = `${postsPath}/${category}/${fileName}`;
		let file = JSON.parse(fs.readFileSync(path, "utf-8"));
		
		// If the post is published, start adding relevant data
		// and also add to the array
		if(file.state === "published") {
			file.fileName = fileName;
			let bodyMd = fs.readFileSync(`${postsPath}${category}/${file.md}`, "utf-8");
			file.body = {
				md: bodyMd,
				short: bodyMd
				  .split("\n")
				  .slice(1)
				  .join("\n")
				  .trim()
				  .replace(/\n(\n)?/g, ". ")
				  .replace(/#/g, "")
				  .replace(/\.\./g, ".")
				  .replace(/\!\./g, "!")
				  .slice(0, 300)	
			};
			file.title = bodyMd.split("\n")[0].replace(/#/g, "").trim();
			posts.push(file);
		}
	}

	posts = posts.sort((a, b) => b.date - a.date);

	return posts;

}