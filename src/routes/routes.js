const RecordController = require('../controllers/record_controller');

module.exports = (app) => {
  app.get("/", (req, res) => res.json({message: "Welcome to our record shop!"}));

  app.route("/records")
      .get(RecordController.show)
      .post(RecordController.create)

  app.route("/records/:id")
      .get(RecordController.find)
      .delete(RecordController.delete)
      .put(RecordController.update)
}
