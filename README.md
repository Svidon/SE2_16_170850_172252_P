# Software Engineering 2 Project by 170850 and 172252

* La ricerca dei luoghi non è implementata tutta nel sito per motivi di tempo, quindi reindirizza su GoogleMaps alla pagina di Trento.
* Scrape delle pagine dell'università e delle notizie della città fatto. Quello degli eventi della città sarebbe simile.
* Aggiunto un semplice login e una registrazione (fatta tramite popup). Tutto gestito con una semplice sessione
* Aggiunti i test. Funzionano solo per getLogged, perchè abbiamo riscontrato un problema nel mandare un codice di risposta con response.redirect: utilizzando response.status(200).redirect('') abbiamo visto che non cambiava lo stato. Si può mandare uno stato usando response.redirect(200, 'url'), ma questo mandava ad una pagina in cui mostrava il codice ed un link per andare alla pagina (quindi molto scomodo). Non ha funzionato neanche aggiungendo nell'header la location e usando poi res.end() (mandava ad una pagina vuota). Abbiamo quindi voluto lasciare nei commenti i codici che avremmo voluto inserire e fare comunque i test come se le API restituissero il giusto codice.
