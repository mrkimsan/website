const { setupDB } = require("./db");

(async () => {
	// Make connection to database. Other database value is exported in same module
	await setupDB();

	// Import and start main web server
	const app = require("./web-server");
	app.listen(Number(process.env.PORT), () => {
		console.log(`Now live on port ${process.env.PORT}!`);
	});
})().catch(console.error);
