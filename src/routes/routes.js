const RecordController = require('../controllers/record_controller');
const UserController = require('../controllers/user_controller');
const CommentController = require('../controllers/comment_controller');

module.exports = (app) => {
	app.get('/api/', (req, res) => res.json({message: 'Welcome to our record shop!'}));

	app.get('/api/records', RecordController.show);
	app.post('/api/records', RecordController.create);
	app.get('/api/records/:id', RecordController.find);
	app.delete('/api/records/:id', RecordController.delete);
	app.put('/api/records/:id', RecordController.update);

	// app.get('/api/records/:id/comments/:commentId', CommentController.find);

	app.get('/api/users', UserController.show);
	app.post('/api/users', UserController.create);
	app.get('/api/users/:id', UserController.find);
	app.delete('/api/users/:id', UserController.delete);
	app.put('/api/users/:id', UserController.update);
};
