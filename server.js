//Librerie per creare il server
var http = require('http');
var express = require('express');
//Mio pacchetto per fare lo scrape
var scrape = require('./parsing.js');
//Libreria per bindare dati nel json in html
var json2html = require('node-json2html');
//Libreria per binding to tpl
var bind = require('bind');

//Instanzio express
var app = express();
//Setto la porta e la directory
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(__dirname + '/'));


//Implemento il get iniziale
app.get('/', function(req, res)
{
	//Chiamo funzione per inserire ciò che c'è nel json nella pagina

	res.redirect("./pages/home.html");
});


//Get per il parse delle notizie dell'universita'
app.get('/notizie_uni', function (req, res) {

	var check = scrape.getUniEvents();

	if(check){
		console.log("Scrape Done");
	}
	else {
		console.log("Scrape not done");
	}





	//Prova json2html (leggi info dal json)
    var info = [{"title": "Come l’ingegnere misura le emozioni", "url": "http://webmagazine.unitn.it/evento/disi/12487/come-l-ingegnere-misura-le-emozioni"}];
 
    var transform = {"<>":"div","html":"<p>${title}<br> <a href=\"${url}\">Link</a></p>"};
        
    var html = json2html.transform(info,transform);

    
    //var div = $.getElementByID("contenuti");
    //div.appendChild(document.createTextNode(html));


    res.end();

    //res.redirect("./pages/home.html");
});


//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
//Check dell'attivita
console.log('Server running at http://127.0.0.1:1337/');
