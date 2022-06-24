(function() {
	const db_info = {url:'localhost',
                        username: 'webuser',
                        password: 'xuan_25',
                        port: '22741',
						database: 'dashboard',
                        collection: 'user',
                        // scoreCollection: "scoredata"
                    };

	const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());
