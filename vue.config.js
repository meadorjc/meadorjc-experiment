module.exports = {
	//...
	configureWebpack: {
		devServer: {
			host: '96.126.118.135',
			port: 80,
			allowedHosts: [
				'.meadorjc.com'
			]

		}
	}
};
