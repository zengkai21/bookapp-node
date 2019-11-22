var express = require('express');
var router = express.Router();
var mongoose = require('../db');
var Schema = mongoose.Schema;

var GoodSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  classify:{
    type:String,
    required:true
  },
  info:{
    type:String,
    required:true
  },
  url: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  infourl:{
    type:String,
    required:true
  }
});
var Goods = mongoose.model('Goods', GoodSchema);

/* GET home page. */
router.get('/1', function(req, res, next) {
  Goods.find({},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

router.get('/2', function(req, res, next) {
  Goods.find({"classify":"童书"},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

router.get('/3', function(req, res, next) {
  Goods.find({"classify":"文学"},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

router.get('/4', function(req, res, next) {
  Goods.find({"classify":"小说"},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

router.get('/5', function(req, res, next) {
  Goods.find({"classify":"励志"},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
});

router.get('/6', function(req, res, next) {
  Goods.find({"id":{$lt :35, $gt : 20}},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
}); 

router.get('/goodsinfo',function(req,res,next){
 var gid=req.query.id
  Goods.find({"id":gid},(err,data)=>{
    if (err) {
      console.log(err);
    } else {
      res.json(
        data
      );
    }
  })
})
module.exports = router;
