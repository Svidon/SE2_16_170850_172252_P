//Librerie per creare il server
var http = require('http');
var express = require('express');
//Mio pacchetto per fare lo scrape
var scrape = require('./parsing.js');
//Mio pacchetto per gestire gli utenti
var user = require('./utenti.js');
//Libreria per gestire la sessione
var session = require('express-session');
var bodyParser = require('body-parser');

//Instanzio express
var app = express();
//Setto la porta, la directory e il bodyParser
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));

//Uso le sessioni
app.use(session({ 
	//Stringa per la sicurezza (non usata)
	secret: 'string for the hash', 
	//Setto validita' del cookie
	cookie: { maxAge: 60000 }
}));


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

	//Imposto sessione a null
	req.session.user_id = null;

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


//Post per la registrazione
app.post('/register', function(req, res) {
	var utente = "";
	var pass = "";

	//Controllo che la richiesta ci sia
	if (typeof req.body !== 'undefined' && req.body){
		//Controllo che username ci sia
		if (typeof req.body.new_username !== 'undefined' && req.body.new_username){
			//Controllo che password ci sia
			if (typeof req.body.new_password !== 'undefined' && req.body.new_password){
				//Salvo nome utente e password
				utente = req.body.new_username;
				pass = req.body.new_password;

				//Controllo se l'utente esiste, altrimenti non lo aggiungo
				var tmp = user.getUser(utente, dict);
				if(tmp == null){
					user.add(utente, pass, dict);
					console.log("Utente aggiunto");
				}
				else{
					console.log("Utente già registrato");
				}
			}
			else{
				console.log("Password undefined");
			}
		}
		else{
			console.log("Username undefined");
		}
	}
	else{
		console.log("Request body undefined");
	}

	res.redirect("./pages/registered.html");
});


//Post per il login
app.post('/login', function(req, res) {
	
	var utente = "";
	var pass = "";

	//Controllo che la richiesta ci sia
	if (typeof req.body !== 'undefined' && req.body){
		//Controllo che ci sia username
		if (typeof req.body.username !== 'undefined' && req.body.username){            
			//Controllo che ci sia password
			if (typeof req.body.password !== 'undefined' && req.body.password){
	            //Salvo nome utente e password
	    		utente = req.body.username;
	    		pass = req.body.password;

				//Controllo se l'utente esiste
				var tmp = user.getUser(utente, dict);				
				if(tmp != null){
					//Controllo se la password e' corretta
					if(pass == tmp.pswd){
						if(req.session.user_id == null){
							//Setto la sessione al nome dell'utente
							req.session.user_id = utente;
							console.log("Loggato");
						}
						else{
							console.log("Già loggato");
						}
					}
					else{
						console.log("Password Errata");
					}
				}
				else{
					console.log("Utente non esistente!");
				}
	    	}
	    	else{ 
				console.log("Password undefined");
			}
	    }
		else{ 
			console.log("User undefined");
		}
	}
	else{
		console.log("Request body undefined");
	}

	res.redirect("./pages/home.html");
});


//Get per il logout
app.get('/logout', function(req, res) 
{
	//Controllo se esiste la sessione
	if (request.session.user_id != null){
		request.session.user_id = null;
		console.log("Sloggato");
  	}
  	else{
  		console.log("Già sloggato");
  	}
	
	res.redirect("./pages/home.html");
});


//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
//Check dell'attivita'
console.log('Server running at http://127.0.0.1:1337/');