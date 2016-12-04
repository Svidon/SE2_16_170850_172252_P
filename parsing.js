//Libraries
//Per scrivere Json
var fs = require('fs');
//Per effettuare azioni sull'url dato
var request = require('request');
//JQuery plugin per fare lo scrape
var cheerio = require('cheerio');


//Funzione per lo scrape di eventi_uni (salva in un json con questo nome)
var uni_e = function scrape_events_uni() {

	//Passo l'url da prendere
	var url = 'http://webmagazine.unitn.it/calendario/ateneo/week';

	//Invio una richiesta per accedere all'html
	request(url, function(error, response, html){
    	if(!error){
    		//Carico l'html
      		var $ = cheerio.load(html);

      		//Instanzio variabili utili: lista dei titoli, lista degli urls, lista degli oggetti da inserire nel json
      		var title = [];
      		var urls = [];
      		var json = [];

      		//Seleziono gli elementi che contengono il titolo e lo salvo in title
	      	$('.titolo-evento').each(function(){
	        	var data = $(this);
	        	title.push(data.children().first().text());
	      	});

	      	//Seleziono i tag <a> solo degli eventi e prendo il parametro href
	      	$('.cal-ateneo-visible').each(function(){
	        	var data = $(this);
	        	urls.push(data.children().first().attr("href"));
	      	});
    	}
    	else {
    		return false;
    	}

    	//Aggiungo tutti gli oggetti alla lista json
    	for(var i = 0; i < title.length; i++){
    		//Oggetto temporaneo per salvarmi gli elementi come unico oggetto da pushare in json
    		var obj = {title : "", url : ""};
    		obj.title = title[i];
    		obj.url = urls[i];

    		json.push(obj);
    	}

    	//Scrivo tutti gli oggetti salvati in un file json
    	fs.writeFile('eventi_uni.json', JSON.stringify(json, null, 2), function(err){
      		console.log('File successfully written! - Check your project directory for the output.json file');
		});
	});

	return true;
}


//Funzione per lo scrape di notizie_uni (salva in un json con questo nome)
var uni_n = function scrape_news_uni() {
	
	//Passo l'url da prendere
	var url = 'http://webmagazine.unitn.it/news/ateneo';

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

      		$('a[href*="http://webmagazine.unitn.it/news/"]').each(function(){
	        	var data = $(this);
	        	urls.push(data.attr("href"));
	      	});
    	}
    	else {
    		return false;
    	}

    	//Aggiungo tutti gli oggetti alla lista json
    	for(var i = 0; i < title.length; i++){
    		//Oggetto temporaneo per salvarmi gli elementi come unico oggetto da pushare in json
    		var obj = {title : "", description : "", url : ""};
    		obj.title = title[i];
    		obj.description = description[i];
    		obj.url = urls[i];

    		json.push(obj);
    	}

    	//Scrivo tutti gli oggetti salvati in un file json
    	fs.writeFile('notizie_uni.json', JSON.stringify(json, null, 2), function(err){
      		console.log('File successfully written! - Check your project directory for the output.json file');
		});
    	
    });

	return true;
}



//Esporto le funzioni
exports.getUniEvents = uni_e;
exports.getUniNews = uni_n;