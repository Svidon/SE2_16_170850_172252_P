//Libraries
//Per le richieste http
var express = require('express');
//Per scrivere Json
var fs = require('fs');
//Per effettuare azioni sull'url dato
var request = require('request');
//JQuery plugin per fare lo scrape
var cheerio = require('cheerio');

//Istanzio express
var app = express();

//Metodo get
app.get('/parse', function (req, res) {

  url = 'http://webmagazine.unitn.it/news/ateneo';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", description : ""};

      $('.views-row views-row-1 views-row-odd views-row-first').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();

        json.title = title;
      })

      $('.sottotitolo-news').filter(function(){
        var data = $(this);
        description = data.children().first().text().trim();

        json.description = description;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
})
});