
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express(); // сервер
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	console.log(req.headers['cookie']);
	db.collection('goods').find().toArray(function(err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	 	goods = docs;
		res.render('index.ejs', { goods : goods});
	});
	function ss(id){
		return "OK";
	}
});

app.get('/goods', function(req, res) {

	var goods;
	db.collection('goods').find().toArray(function(err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	 	goods = docs;
	 	res.send(goods);
	});
});


app.post('/goods', function(req, res) {

	var goods  = {
		name : req.body.name,
		price : req.body.price
	};
	db.collection('goods').insert(goods, function(err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(goods);
	});

});

app.delete('/goods/:id', function(req, res) {
	db.collection('goods').deleteOne(
		{ _id : ObjectID(req.params.id) },
		function(err, result) {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}
	);
});

MongoClient.connect('mongodb://localhost:27017/myapp', function(err, database) {
	if (err) {
		return console.log(err);
	}
	else {
		db = database;
		app.listen('3000', function() {
		console.log('Port : 3000');
		});
	}

});
