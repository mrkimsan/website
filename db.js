const { InfluxDB, FieldType } = require("influx");
let conn;

const { INFLUX_HOST, INFLUX_USER, INFLUX_PASS, INFLUX_DATABASE, INFLUX_PORT } = process.env;

async function setupDB() {
	const dbName = INFLUX_DATABASE;
	conn = new InfluxDB({
		host: INFLUX_HOST,
        database: dbName,
        username: INFLUX_USER,
        password: INFLUX_PASS,
        port: Number(INFLUX_PORT),
		schema: [
			{
				measurement: "requests",
				fields: {
					path: FieldType.STRING,
                    duration: FieldType.INTEGER,
                    status: FieldType.INTEGER
				},
				tags: []
			}
		]
	});
	
	const pingRes = await conn.ping(5000);
	const onlineCount = pingRes.reduce((p, host) => p + (!host.online ? 0 : 1), 0);
	if (onlineCount < 1) {
		throw new Error("No database is online suckahhhh");
	}

	const dbNames = await conn.getDatabaseNames();
	if (!dbNames.includes(dbName)) {
		await conn.createDatabase(dbName);
	}
}

function requestLogger(req, res, next) {
    const start = Date.now();

    res.on("finish", async () => {
        const duration = Date.now() - start;
        try {
            await conn.writePoints([{
                measurement: "requests",
                fields: {
                    path: req.path,
                    duration,
                    status: res.statusCode
                },
                tags: {}
            }]);
        } catch (err) {
            console.error("Failed to write to database", err);
        }
    });

    next();
}

module.exports = {
    setupDB,
    requestLogger
};
