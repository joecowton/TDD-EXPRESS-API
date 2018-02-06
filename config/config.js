var config = {
	port: process.env.PORT || 27017,
	db: process.env.MONGOLAB_URI || "mongodb://user:user@ds225308.mlab.com:25308/todo-dev",
	test_port: 27017,
	test_db: "mongodb://user:user@ds225308.mlab.com:25308/todo-dev"
}
module.exports = config;
