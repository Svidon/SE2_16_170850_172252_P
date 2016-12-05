//Funzione per includere header e footer
function include(){
    $("#includeHeader").load("html_modules/header.html");
    $("#includeFooter").load("html_modules/footer.html");
};


//Funzione per mostrare gli eventi dell'universita'
function showUniEv(){

	//Richiedo il json per prendere gli eventi dell'universita'
	$.getJSON("http://127.0.0.1:1337/eventi_uni.json", function (data) {
		
		//Genero codice html secondo i dati
		var write = "";
		for(var i = 0; i < data.length; i++){
			write += "<div><p><a href=\""+data[i].url+"\">"+data[i].title+"</a></p></div>";
		}

		//Inserisco il codice generato in pagina
		$("#contenuti").html(write);
	});
}


//Funzione per mostrare le notizie
function showUniNews(){

	//Richiedo il json per prendere le notizie
	$.getJSON("http://127.0.0.1:1337/notizie_uni.json", function (data) {
		
		//Genero codice html secondo i dati
		var write = "";
		for(var i = 0; i < data.length; i++){
			write += "<div><p><a href=\""+data[i].url+"\"><h3>"+data[i].title+"</h3></a>"+data[i].description+"</p></div>";
		}

		//Inserisco il codice generato in pagina
		$("#contenuti").html(write);
	});
}