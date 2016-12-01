//Librerie
var http = require('http');
var express = require('express');

//Per scrivere Json
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



//Metodo get
app.get('/parse', function (req, res) {

  url = 'http://webmagazine.unitn.it/news/ateneo';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", description : ""};

      $('[href]').filter(function(){
        var data = $(this);
        title = data.text();

        json.title = title;
      })

      $('.sottotitolo-news').filter(function(){
        var data = $(this);
        description = data.text();

        json.description = description;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
})
});



//Dove il server fa il listen
app.listen(1337, '127.0.0.1');
 
//Check dell'attivita
console.log('Server running at http://127.0.0.1:1337/');
