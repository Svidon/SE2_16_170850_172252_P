//Librerie per creare il server
var http = require('http');
var express = require('express');
//Mio pacchetto per fare lo scrape
var scrape = require('./parsing.js');
//Mio pacchetto per gestire gli utenti
var user = require('./utenti.js');


//Instanzio express
var app = express();
//Setto la porta e la directory
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(__dirname + '/'));

//Insieme degli utenti
var dict = {}
//Instanzio due utenti base
user.add("Admin", "admin567", dict);
user.add("Utente", "normale95", dict);


//Implemento il get iniziale
app.get('/', function(req, res)
{
	//Chiamo funzioni per recuperare i dati
	scrape.getUniEvents();
	scrape.getUniNews();
	scrape.getComuneNews();

	res.redirect("./pages/home.html");
});


//Get per refreshare le notizie dell'universita'
app.get('/notizie_uni', function (req, res) {

	var check = scrape.getUniNews();

    res.redirect("./pages/home.html");
});


//Get per refreshare gli eventi dell'universita'
app.get('/eventi_uni', function (req, res) {

	var check = scrape.getUniEvents();

    res.redirect("./pages/eventi_uni.html");
});


//Get per refreshare le notizie della citta'
app.get('/notizie_city', function(req, res){

	var check = scrape.getComuneNews();

	res.redirect("./pages/notizie_city.html");
});


//Post per il login
app.post('/login', function(req, res) {
	
	var utente = "";
	var pass = "";

	//Controllo che la richiesta ci sia
	if (typeof req.body !== 'undefined' && req.body){
        //Controllo il contenuto del post
		console.log("req.body: " + req.body);
		
		//Controllo che ci sia username
		if (typeof req.body.username !== 'undefined' && req.body.username){
            //Salvo l'username
			utente = req.body.username;
		}
		else{ 
			utente = "not defined";
		}
		//Controllo che ci sia password
		if (typeof req.body.password !== 'undefined' && req.body.password){
            //Salvo la password
    		pass = req.body.password;
    	}
		else{ 
			pass = "not defined";
		}
	}

	var tmp = user.getUser(utente, dict);

	if(tmp != null){
		if(pass == tmp.pswd){
			//Setta la sessione
		}
		else{
			console.log("Password Errata");
		}
	}
	else{
		console.log("Utente non esistente!");
	}


	res.redirect("./pages/home.html");
});


//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
//Check dell'attivita'
console.log('Server running at http://127.0.0.1:1337/');