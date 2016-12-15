//Test per APIs

//Libreria per richieste
var request = require("request");

//Seet base URL
var base_url = "http://localhost:1337/";

//Libreria JSON request
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);

//Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

//Test for notizie_uni
describe("Test /notizie_uni", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "notizie_uni/", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

//Test for eventi_uni
describe("Test /eventi_uni", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "eventi_uni/", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

//Test for eventi_uni
describe("Test /notizie_city", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "notizie_city/", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

//Test for register
describe("Test /register", function() {
	
	//Setto un nuovo utente
	var data = {new_username: "ciao", new_password: "ciao95"};
	it("to returns status code 200 with legit new user", function(done) {
	  client.post(base_url + "register/", data, function(error, response, body) {
		expect(response.statusCode).(200);
		done();
	  });
	});

	//Setto utente che già esiste
	var data1 = {new_username: "Admin", new_password: "admin567"};
	it("to returns status code 401 with already existing user", function(done) {
	  client.post(base_url + "register/", data1, function(error, response, body) {
		expect(response.statusCode).(401);
		done();
	  });
	});

	//Setto solo username
	var data2 = {new_username: "Admin"};
	it("to returns status code 400 with no password", function(done) {
	  client.post(base_url + "register/", data2, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});

	//Setto solo password
	var data3 = {new_password: "Admin"};
	it("to returns status code 400 with no username", function(done) {
	  client.post(base_url + "register/", data3, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});

	//Setto il body vuoto
	var data4 = {};
	it("to returns status code 400 with no body", function(done) {
	  client.post(base_url + "register/", data4, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});
}

//Test for login
describe("Test /login", function() {
	
	//Setto un utente esistente e password corretta
	var data = {username: "Admin", password: "admin567"};
	it("to returns status code 200 with legit new user", function(done) {
	  client.post(base_url + "login/", data, function(error, response, body) {
		expect(response.statusCode).(200);
		done();
	  });
	});

	//Setto utente che non esiste
	var data1 = {username: "ciao", password: "ciao95"};
	it("to returns status code 401 with non-existing user", function(done) {
	  client.post(base_url + "login/", data1, function(error, response, body) {
		expect(response.statusCode).(401);
		done();
	  });
	});

	//Setto utente che già esiste, ma password errata
	var data2 = {username: "Admin", password: "aknsfolenf"};
	it("to returns status code 401 with wrong password", function(done) {
	  client.post(base_url + "login/", data2, function(error, response, body) {
		expect(response.statusCode).(401);
		done();
	  });
	});

	//Setto solo la password
	var data3 = {password: "Admin"};
	it("to returns status code 400 with no username", function(done) {
	  client.post(base_url + "login/", data3, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});

	//Setto solo utente
	var data4 = {username: "Admin"};
	it("to returns status code 400 with no password", function(done) {
	  client.post(base_url + "login/", data4, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});

	//Setto body vuoto
	var data5 = {};
	it("to returns status code 400 with no body", function(done) {
	  client.post(base_url + "login/", data5, function(error, response, body) {
		expect(response.statusCode).(400);
		done();
	  });
	});
}

//Test for logout
describe("Test /logout", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "logout/", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

//Test for getLogged
describe("Test /getLogged", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "getLogged/", function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});