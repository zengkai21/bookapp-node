var express = require('express');
var router = express.Router();
var mongoose = require('../db');
var Schema = mongoose.Schema;

var lunboSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

var Lunbo = mongoose.model('Lunbo', lunboSchema);


/* GET users listing. */
router.get('/', function (req, res, next) {
  Lunbo.find({},(err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

module.exports = router;