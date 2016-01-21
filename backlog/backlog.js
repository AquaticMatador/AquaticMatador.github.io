function mediumSelect(){
	var userMedium = document.querySelector("#medium").value;
	if (userMedium === "movie"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='length'>Runtime: </label><input type='text' class='form-control' id='length' /></div>"
	} else if(userMedium === "tv"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='numEpisodes'>Number of Episodes: </label><input type='text' class='form-control' id='numEpisodes' /></div>"
		document.querySelector("#mediumForm").innerHTML += "<div class='form-group'><label for='length'>Length of Episode: </label><input type='text' class='form-control' id='length' /></div>"
	} else if(userMedium === "game"){
		document.querySelector("#mediumForm").innerHTML = "";

	} else if(userMedium === "book"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='length'>Total Number of Pages: </label><input type='text' class='form-control' id='length' /></div>"
	}
}

var submitButton = document.querySelector("#submit");

//Checks for click
submitButton.addEventListener("click", insertData, false);
function insertData(){

	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	var user = firebaseRef.getAuth();
	if(user === null){
		console.log("login failed");
	} else{
	var userRef = firebaseRef.child(user.uid);
	var userTitle = document.querySelector("#title").value;
	var userMedium = document.querySelector("#medium").value;
	var userStatus = document.querySelector("#status").value;

	if (userMedium === "movie"){
		var userLength = document.querySelector("#length").value;
		var item = {title: userTitle, status: userStatus, length: userLength, medium: userMedium};
		userRef.child("movie/" + userTitle).set(item);
	} else if(userMedium === "tv"){
		var userLength = document.querySelector("#length").value;
		var userNumEpisodes = document.querySelector("#numEpisodes").value;
		var item = {title: userTitle, status: userStatus, length: userLength, numOfEpisodes: userNumEpisodes, medium: userMedium}
		userRef.child("tv/" + userTitle).set(item);
	} else if(userMedium === "game"){
		var item ={title: userTitle, status: userStatus, medium: userMedium};
		userRef.child("game/" + userTitle).set(item);
	} else if(userMedium === "book"){
		var userLength = document.querySelector("#length").value;
		var item = {title: userTitle, status: userStatus, length: userLength, medium: userMedium};
		userRef.child("book/" + userTitle).set(item);
	}
	//firebaseRef.unauth();
}
	//firebaseRef.push("jim");
}
var logoutButton = document.querySelector("#out");
logoutButton.addEventListener("click", logOut, false);
function logOut(){
	firebaseRef.unauth();
	window.location.assign("logon.html");
}



