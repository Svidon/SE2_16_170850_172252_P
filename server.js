//Librerie per creare il server
var http = require('http');
var express = require('express');
//Per scrivere nel file Json
var fs = require('fs');
//Per effettuare azioni sull'url dato
var request = require('request');
//JQuery plugin per fare lo scrape
var cheerio = require('cheerio');

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



//Get per il parse delle notizie dell'universita'
app.get('/parse', function (req, res) {

	//Paso l'url da prendere
	url = 'http://webmagazine.unitn.it/news/ateneo';

	//Invio una richiesta per accedere all'html
	request(url, function(error, response, html){
    	if(!error){
    		//Carico l'html
      		var $ = cheerio.load(html);

      		//Instanzio variabili utili: lista dei titoli, lista degli urls, lista delle descrizioni, lista degli oggetti da inserire nel json
      		var title = [];
      		var urls = [];
      		var description = [];
      		var json = [];

      		//Seleziono gli elementi che contengono il titolo e lo salvo in title
	      	$('a[href*="http://webmagazine.unitn.it/news/"]').each(function(){
	        	var data = $(this);
	        	title.push(data.text());
	      	});

	      	//Seleziono gli elementi che contengono la descrizione e lo salvo in description
      		$('.sottotitolo-news').each(function(){
        		var data = $(this);
        		description.push(data.text());
      		});
    	}

    	//Aggiungo tutti gli oggetti alla lista json
    	for(var i = 0; i < title.length; i++){
    		//Oggetto temporaneo per salvarmi gli elementi come unico oggetto da pushare in json
    		var obj = {title : "", description : ""};
    		obj.title = title[i];
    		obj.description = description[i];

    		json.push(obj);
    	}

    	//Scrivo tutti gli oggetti salvati in un file json
    	fs.writeFile('notizie_uni.json', JSON.stringify(json, null, 2), function(err){
      		console.log('File successfully written! - Check your project directory for the output.json file');
    	})

    	res.redirect("./pages/home.html");
	})
});



//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
 
//Check dell'attivita
console.log('Server running at http://127.0.0.1:1337/');
