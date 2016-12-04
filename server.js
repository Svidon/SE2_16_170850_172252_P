//Librerie per creare il server
var http = require('http');
var express = require('express');

//Mio pacchetto per fare lo scrape
var scrape = require('./parsing.js');

//Instanzio express
var app = express();
//Setto la porta e la directory
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(__dirname + '/'));


//Implemento il get iniziale
app.get('/', function(req, res)
{
	res.redirect("./pages/home.html");
});


//Get di prova per vedere se funziona il pacchetto
app.get('/prova', function(req, res)
{
	res.redirect("./pages/home.html");
});


//Get per il parse delle notizie dell'universita'
app.get('/notizie_uni', function (req, res) {

	var check = scrape.getUniNews();

	if(check){
		console.log("Scrape Done");
	}
	else {
		console.log("Scrape not done");
	}

    res.redirect("./pages/home.html");
});



//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
 
//Check dell'attivita
console.log('Server running at http://127.0.0.1:1337/');
