module.exports = {
	apps : [
		{
			name: "Simulator server",
			script: "./index.js",
			watch: true,
			env: {
				"NODE_ENV": "production",
			}
		}
	]
}
