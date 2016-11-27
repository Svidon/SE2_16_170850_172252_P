//Librerie
var http = require('http');
var express = require('express');

//Instanzio express
var app = express();
//Setto la porta e la directory
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(__dirname + '/'));


//Implemento il get iniziale
app.get('/', function(req, res)
{
	res.redirect("./pages/index.html");
});


//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
 
//Check dell'attivita
console.log('Server running at http://127.0.0.1:1337/');
