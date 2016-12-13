//Creo una classe per gestire gli utenti
class User {
	//Costruttore della classe con parametri name e password
	constructor(name, pswd){
		this.name = name;
		this.pswd = pswd;
	}

	//Aggiungo l'utente al dict
	add(dict){
		dict[this.name] = this;
	}
};

module.exports = {
	//funzione per ottenere l'employee corrispondente ad un dato id
	getUser: function getUser(name, dict){
			return dict[name];
	},

	//Aggiungo un utente
	add: function addUser(name, pswd, dict){
		var u = new User(name, pswd);
		u.add(dict);
		return dict[name];
	}
}