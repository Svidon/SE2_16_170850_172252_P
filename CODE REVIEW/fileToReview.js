/*******************
server
*******************/

//express lib
var express = require('express');
//inspect   //COMMENTO IMPRECISO
var util = require('util');
//instantiate express
var app = express();
//POST      //COMMENTO IMPRECISO
var bodyParser = require('body-parser');
//for templates
var bind = require('bind');

var miomodulo = require('./lib/lib.js');  //NON C'E' COMMENTO PER CAPIRE LE FUNZIONALITA'
app.use(express.static(__dirname + '/public')); // serve per far funzionare il collegamento dei js e css

/******************************************************************************************************
CREAZIONE TEMPLATE
******************************************************************************************************/
//listen in a specific port   //LA FUNZIONE SETTA LA PORTA, NON FA ANCORA IL LISTEN
app.set('port', (process.env.PORT || 1337));
//create a server
app.get('/', function(req, res) {
	//bind to template
	bind.toFile('tpl/home.tpl', {
        //set up parameters
		visibile : false,
		id_search: '',
		id_delete: '',
        id: '',
        name: '',
		surname: '',
		level: '',
		salary: ''

    }, 
    function(data){
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});


app.use(bodyParser.urlencoded({ extended: false }));
/******************************************************************************************************
POST DELETE
******************************************************************************************************/
app.post('/delete', function(req, res) {
	var msg = '';
	var elimina = "";
	var errore = false;
	
	if ( typeof req.body !== 'undefined' && req.body){
        //the ontent of the POST receiced
		msg = "req.body: " + util.inspect(req.body);
		// salvo il contenuto del campo iID
		if ( typeof req.body.iIDDelete !== 'undefined' && req.body.iIDDelete)
			elimina = parseInt(req.body.iIDDelete);
		else {
			elimina = true; //VARIABILE SBAGLIATA, DOVREBBE ESSERE errore NON elimina
		} 	
	} else { //SI DOVREBBE AGGIUNGERE errore = true  PER POTER POI ENTRARE NELL'IF SUCCESSIVO
		msg = "body undefined";
	}
	if (errore){
		console.log("errore"); //CONSOLE LOG CHE SI PUO' TOGLIERE
	} else { //QUESTA PARTE DI CODICE NON DOVREBBE ESSERE ESEGUITA SE IL BODY DELLA REQUEST E' UNDEFINED (E' INUTILE CERCARE UN DIPENDENTE CON COME ID UNA STRINGA VUOTA)
		var posizione = miomodulo.cercaDipendente(elimina); //NON C'E' UN CONTROLLO PER GESTIRE IL FATTO CHE IL DIPENDENTE NON ESISTA
		miomodulo.delDipendente(posizione);
		console.log("\n\nELIMANA id: "+elimina+" in pos: "+posizione); //CONSOLE LOG CHE SI PUO' TOGLIERE. LA POSIZIONE NELLA LISTA NON E' COMUNQUE UTILE PER QUESTO LOG
		console.log(msg); //CONSOLE LOG CHE SI PUO' TOGLIERE
		miomodulo.stampa(); //STAMPA NON NELLA PAGINA, SI PUO' TOGLIERE
	}
	//bind to template
	bind.toFile('tpl/home.tpl', {
        //set up parameters
		visibile : false,
		id_search: '',
		id_delete: '',
        id: '',
        name: '',
		surname: '',
		level: '',
		salary: ''
    }, 
    function(data){
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/******************************************************************************************************
POST SEARCH
******************************************************************************************************/
app.post('/search', function(req, res) {
	var msg = '';
	var cerca = "";
	var errore = false;
	
	if ( typeof req.body !== 'undefined' && req.body){ //PARTE DI CODICE RIPETUTA FINO A RIGA 121 ANCHE IN DELETE. SI POTEVA COSTRUIRE UNA FUNZIONE A CUI PASSARE LA RICHIESTA
        //the ontent of the POST receiced
		msg = "req.body: " + util.inspect(req.body);
        //content of the post
		// salvo il contenuto del campo iID
		if ( typeof req.body.iIDSearch !== 'undefined' && req.body.iIDSearch)
			cerca = parseInt(req.body.iIDSearch);
		else {
			errore = true;
		} 	
	} else { //SI DOVREBBE AGGIUNGERE errore = true  PER POTER POI ENTRARE NELL'IF SUCCESSIVO
		msg = "body undefined";
	}
	
	if (errore){
		console.log("errore"); //CONSOLE LOG CHE SI PUO' TOGLIERE
	}
	else{ //QUESTA PARTE DI CODICE NON DOVREBBE ESSERE ESEGUITA SE IL BODY DELLA REQUEST E' UNDEFINED (E' INUTILE CERCARE UN DIPENDENTE CON COME ID UNA STRINGA VUOTA)
		var posizione = miomodulo.cercaDipendente(cerca); //NON C'E' UN CONTROLLO PER GESTIRE IL FATTO CHE IL DIPENDENTE NON ESISTA
		var dipendente = miomodulo.getDipendente(posizione);
		console.log("\n\nCERCA id: "+cerca+" in pos: "+posizione); //CONSOLE LOG CHE SI PUO' TOGLIERE
		console.log(msg); //CONSOLE LOG CHE SI PUO' TOGLIERE
		miomodulo.stampa(); //STAMPA NON NELLA PAGINA, SI PUO' TOGLIERE
	}
	
	//bind to template
	bind.toFile('tpl/home.tpl', {
        //set up parameters
		visibile : true,
		id_search: dipendente.id,
		id_delete: '',
        id: dipendente.id,
        name: dipendente.name,
		surname: dipendente.surname,
		level: dipendente.level,
		salary: dipendente.salary
    }, 
    function(data){
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});


/******************************************************************************************************
POST INSERT
******************************************************************************************************/
app.post('/insert', function(req, res) {
	var msg = '';
	var errore = false;
	var dipendente = miomodulo.init();

	if ( typeof req.body !== 'undefined' && req.body) //SI POTEVA SFRUTTARE UNA FUNZIONE A PARTE DESCRITTA IN UN REVIEW PRECEDENTE E
	{
        //the ontent of the POST receiced
		msg = "req.body: " + util.inspect(req.body);
        //content of the post
		// salvo il contenuto del campo iID
		if ( typeof req.body.iID !== 'undefined'){
			if(req.body.iID=="")
				dipendente.id = miomodulo.setId();
			else
				dipendente.id = parseInt(req.body.iID);
		} else {
			dipendente.id = "not defined";
			errore = true;
		}
		// salvo il contenuto del campo iName		
		if ( typeof req.body.iName !== 'undefined' && req.body.iName)
			dipendente.name = req.body.iName;
		else{ 
			dipendente.name = "not defined";
			errore = true;
		}
		// salvo il contenuto del campo iSurname		
		if ( typeof req.body.iSurname !== 'undefined' && req.body.iSurname)
			dipendente.surname = req.body.iSurname;
		else{ 
			dipendente.surname = "not defined";
			errore = true;
		}
		// salvo il contenuto del campo iLevel			
		if ( typeof req.body.iLevel !== 'undefined' && req.body.iLevel)
			dipendente.level = parseInt(req.body.iLevel);
		else{ 
			dipendente.level = "not defined";		
			errore = true;
		}
		// salvo il contenuto del campo iSalary				
		if ( typeof req.body.iSalary !== 'undefined' && req.body.iSalary)
			dipendente.salary = parseInt(req.body.iSalary);
		else{ 
			dipendente.salary = "not defined";	
			errore = true;
		}   	
	} else { //SI DOVREBBE AGGIUNGERE errore = true  PER POTER POI ENTRARE NELL'IF SUCCESSIVO
		msg = "body undefined";
	}
	
	if (errore){
		console.log("errore");
	} else { //QUESTA PARTE DI CODICE NON DOVREBBE ESSERE ESEGUITA SE IL BODY DELLA REQUEST E' UNDEFINED (E' INUTILE CERCARE UN DIPENDENTE CON COME ID UNA STRINGA VUOTA)
		var posizione = miomodulo.cercaDipendente(dipendente.id);
		if(posizione==-1){
			console.log("\n\nINSERISCI elem"); //CONSOLE LOG CHE SI PUO' TOGLIERE
			miomodulo.aggiungiDipendente(dipendente);
		} else{
			console.log("\n\nMODIFICA elem"); //CONSOLE LOG CHE SI PUO' TOGLIERE
			miomodulo.modificaDipendente(dipendente,posizione);	
		}
		console.log(msg); //CONSOLE LOG CHE SI PUO' TOGLIERE
		miomodulo.stampa(); //STAMPA NON NELLA PAGINA, SI PUO' TOGLIERE
	}
	
	//bind to template
	bind.toFile('tpl/home.tpl', {
        //set up parameters
		visibile : false,
		id_search: '',
		id_delete: '',
        id: '',
        name: '',
		surname: '',
		level: '',
		salary: ''
    }, 
    function(data) {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});


//listen in a specific port
app.listen("1337", '127.0.0.1');
//check status
console.log('Server running at http://127.0.0.1:1337');