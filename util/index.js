
const fs = require("fs");

module.exports.getLocale = (lang, variant) => {
	let path = `./locales/${lang.toLowerCase()}_${variant.toLowerCase()}.json`;
	let locale;
	if(fs.existsSync(path)) locale = JSON.parse(fs.readFileSync(path, "utf-8"));
	return locale || null;
}