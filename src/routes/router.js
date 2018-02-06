var express = require('express');
var router = express.Router();

var Record = require('../models/record');
var RecordController = require('../controllers/record.controller')(RecordCtrl);

router.get('/record', TodoController.GetRecord)
router.get('/record/new', TodoController.PostRecord)

module.exports = router;
