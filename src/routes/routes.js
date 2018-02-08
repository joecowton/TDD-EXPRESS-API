const RecordController = require('../controllers/record_controller');

module.exports = (app) => {
  app.get("/api/", (req, res) => res.json({message: "Welcome to our record shop!"}));

  app.get('/api/records', RecordController.show)
  app.post('/api/records', RecordController.create)
  app.get('/api/records/:id', RecordController.find)
  app.delete('/api/records/:id', RecordController.delete)
  app.put('/api/records/:id', RecordController.update)
}
