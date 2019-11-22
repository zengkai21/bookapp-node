var express = require('express');
var router = express.Router();
var mongoose = require('../db');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addressList: [{
        aid: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        tel: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    }],
    cardList: []
});

var User = mongoose.model('User', UserSchema);


/* GET users listing. */
router.post('/login', function (req, res, next) {
    var login = {
        username: req.body.user.userName,
        password: req.body.user.userPasswd
    }
    User.findOne(login, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(
                data
            );
        }
    })
});

router.get('/addresslist', function (req, res, next) {
    var username = req.query.username
    User.find({
        'username': username
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(
                data[0].addressList
            );
        }
    })
});

router.post('/addressedit', function (req, res) {
    var username = req.body.username
    var aid = req.body.address.aid
    var name = req.body.address.name
    var tel = parseInt(req.body.address.tel)
    var addressinfo = req.body.address.address
    User.updateOne({
        "username": username,
        "addressList.aid": aid
    }, {
        "addressList.$.name": name,
        "addressList.$.tel": tel,
        "addressList.$.address": addressinfo
    }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(
                data[0].addressList
            )

        }
    })
})


router.post('/addressSave', function (req, res) {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data.forEach(value => {
                value.addressList.push(req.body)
                value.save()
            })
            res.json(
                data
            )
        }
    })
})

router.post('/addressdel', function (req, res) {
    var username = req.body.username
    var aid = req.body.aid
    User.remove({"username":username,"aid":aid}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('fdf')
        }
    })
})

router.post('/addcard',function(req,res){
    var goodid= req.body.id;
    var goodimg=req.body.url;
    var goodname=req.body.name;
    var goodprice=req.body.price;
    var goodnum = req.body.num;
    var good={
        goodid,
        goodimg,
        goodname,
        goodprice,
        goodnum
    }

    User.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data.forEach(value => {
                value.cardList.push(good)
                value.save()
            })
            res.json(
                data
            )
        }
    })
})

router.get('/getcardlist',function(req,res){
    User.find({},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(
                data[0].cardList
            )
        }
    })
})
module.exports = router;