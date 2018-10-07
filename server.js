const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const php = require('php-express');
var BSON = require('bson')
const Long = BSON.Long;
var bson = new BSON();
const fs = require('fs');

var dataArray = new Array();
var dataPoint;
var serializedData;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var phpExpress = require('php-express')({
  binPath: 'php'
});

//There must be a more effeicient way I just havent figured out lol:

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', (req, res, next) => {
	res.sendFile(__dirname + '/index.css');
});

app.get('/css/bootstrap.min.css', (req, res, next) => {
	res.sendFile(__dirname + '/css/bootstrap.min.css');
});

app.get('/src/img/github.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/img/github.png');
});

app.get('/contact.html', (req, res, next) => {
	res.sendFile(__dirname + '/contact.html');
});

app.get('/staff.html', (req, res, next) => {
	res.sendFile(__dirname + '/staff.html');
});

app.get('/catalog.html', (req, res, next) => {
	res.sendFile(__dirname + '/catalog.html');
});

app.get('/action_page.php', (req, res, next) => {
	res.sendFile(__dirname + '/action_page.php');
});

app.get('/login.html', (req, res, next) => {
	res.sendFile(__dirname + '/login.html');
});

app.get('/src/img/no-image.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/img/no-image.png');
});

app.get('/src/img/no-profile.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/img/no-profile.png');
});

app.get('/src/articles/png/article1.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/png/article1.png');
});

app.get('/src/articles/png/article2.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/png/article2.png');
});

app.get('/src/articles/png/article3.png', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/png/article3.png');
});

app.get('/src/fonts/NexaBold.otf', (req, res, next) => {
	res.sendFile(__dirname + '/src/fonts/NexaBold.otf');
});

app.get('/src/fonts/NexaLight.otf', (req, res, next) => {
	res.sendFile(__dirname + '/src/fonts/NexaLight.otf');
});

app.get('/src/articles/pdf/article1.pdf', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/pdf/article1.pdf');
}); 

app.get('/src/articles/html/article2.html', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/html/article2.html');
}); 

app.get('/src/articles/pdf/article3.pdf', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/pdf/article3.pdf');
}); 

app.get('/src/articles/pdf/article2.pdf', (req, res, next) => {
	res.sendFile(__dirname + '/src/articles/pdf/article2.pdf');
}); 



fs.writeFileSync('data.json', dataArray, finished);
function finished(err) {
	console.log('error');
}

//Pushes data from form on contact.html to data.json
// SENSITIVE INFO PLEASE STAY OUT
//Trying to encrypr to binary with bson data format
app.post('/action_page.php',function(req,res){
	'use strict'
   var email = req.body.email;
   var username = req.body.name;
   var password = req.body.password;
	
	for(let i = 0; i < 3; i++) {
		if(i === 0) {
			dataPoint = {string: email}
			serializedData = bson.serialize(dataPoint);
			dataArray.push(serializedData);
		} else if(i === 1) {
			dataPoint = {string: username}
			serializedData = bson.serialize(dataPoint);
			dataArray.push(serializedData);
		} else if(i === 2) {
			dataPoint = {string: password}
			serializedData = bson.serialize(dataPoint);
			dataArray.push(serializedData);
		}
	}

	fs.writeFile('data.json', dataArray, finished);
	//De-serialize
	//var doc_2 = bson.deserialize(data);
	//console.log('doc_2:', doc_2);
	res.send('<nav class="navbar navbar-expand-lg navbar-light bg-primary"> <a class="navbar-brand text-light" href="/index.html">The Idiv Times</a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarSupportedContent"> <ul class="navbar-nav mr-auto"> <li class="nav-item active"> <a class="nav-link text-light" href="/catalog.html">Catalog <span class="sr-only">(current)</span></a> </li><li class="nav-item"> <a class="nav-link text-light" href="/staff.html">Staff</a> </li><li class="nav-item"> <a class="nav-link text-light" href="/contact.html">Contact</a> </li></ul> </div></nav>');
});

/*
*Post data to file use data to send emails,
*This file will just say thanks for signing up
*
*/

app.listen(PORT, () => {
	console.log("Server listening on port: " + PORT + "");
});