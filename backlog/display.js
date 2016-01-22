$(document).ready(function() {
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	var user = firebaseRef.getAuth();
	var userRef = firebaseRef.child(user.uid);
	var userID = user.uid;
	var timeSpentMovie = 0;
	var timeSpendMovie = 0;
	var timeSpentGame = 0;
	var timeSpentTv = 0;
	var timeSpendTv = 0;

  	/*instead make the drop down thing work by giving a hidden tab and make a button make it unhidden*/
	var movieRef = userRef.child("movie")
	movieRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var movieTable = $("#head");
		var timeSpent = $("#movieSpent");
		var timeSpend = $("#movieSpend");
		if(data.status === "started" || data.status === "backlogged"){
			timeSpendMovie = timeSpendMovie + Number(data.length);
		} else if (data.status != "dropped"){
			timeSpentMovie = timeSpentMovie + Number(data.length);
		}
		var getColor = colorGetter(data);
		movieTable.after("<tr class='" + getColor + "'><td class='edit'>" + data.title + "</td><td>" + data.length + "</td><td>" + data.status + "  <a href='#edit' onclick='editData()'>edit</a></td></tr>")
		timeSpent.text(timeSpentMovie + " minutes");
		timeSpend.text(timeSpendMovie + " minutes");
		//console.log(data.title);
	});
	var bookRef = userRef.child("book")
		bookRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var bookTable = $("#tableBook");
		var getColor = colorGetter(data);
		bookTable.append("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.length + "</td><td>" + data.status + " <a href='#edit' onclick='editData()'>edit</a></td></tr>")
		//console.log(data.title);
	});
	var gameRef = userRef.child("game")
		gameRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var timeSpent = $("#gameSpent");
		var gameTable = $("#tableGame");
		if(data.status != "backlogged"){
			timeSpentGame = timeSpentGame + Number(data.progress);
		}
		var getColor = colorGetter(data);
		gameTable.after("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.status + " <a href='#edit' onclick='editData()'>edit</a></td></tr>")
		timeSpent.text(timeSpentGame + " hours");
		//console.log(data.title);
	});
	var tvRef = userRef.child("tv")
		tvRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var timeSpent = $("#tvSpent");
		var timeSpend = $("#tvSpend");
		if (data.status != "backlogged"){
			timeSpentTv = timeSpentTv + (Number(data.progress) * Number(data.length));
		}
		if (data.status != "finished" && data.status != "dropped")	{
			timeSpendTv = timeSpendTv + ((Number(data.numOfEpisodes) - Number(data.progress)) * Number(data.length))
		}
		var tvTable = $("#tableTv");
		var getColor = colorGetter(data);
		tvTable.after("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.numOfEpisodes + "</td><td>" + data.length + "</td><td>" + data.status + " <a href='#edit' onclick='editData()'>edit</a></td></tr>")
		timeSpent.text(timeSpentTv + " minutes");
		timeSpend.text(timeSpendTv + " minutes");
		//console.log(data.title);
	});
	$("#out").click(function(){
		firebaseRef.unauth();
		window.location.assign("logon.html");
	});
});

function colorGetter(userData){
	if(userData.status === "dropped"){
		return "danger";
	} else if(userData.status === "finished"){
		return "success";
	} else if(userData.status === "started"){
		return "info";
	} else if(userData.status === "backlogged"){
		return "warning";
	}
}

function editData(){
	//console.log("a");
	function mediumSelect(){
	var userMedium = document.querySelector("#medium").value;
	if (userMedium === "movie"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='length'>Runtime(Minutes): </label><input type='text' class='form-control' id='length' /></div>"
	} else if(userMedium === "tv"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='numEpisodes'>Number of Episodes: </label><input type='text' class='form-control' id='numEpisodes' /></div>"
		document.querySelector("#mediumForm").innerHTML += "<div class='form-group'><label for='length'>Length of Episode(Minutes): </label><input type='text' class='form-control' id='length' /></div>"
	} else if(userMedium === "game"){
		document.querySelector("#mediumForm").innerHTML = "";

	} else if(userMedium === "book"){
		//document.querySelector("#mediumForm").innerHTML = "";
		document.querySelector("#mediumForm").innerHTML = "<div class='form-group'><label for='length'>Total Number of Pages: </label><input type='text' class='form-control' id='length' /></div>"
	}
	
	/*use dom to change the status back to default*/

}

function statusSelect(){
	var userMedium = document.querySelector("#medium").value;
	var userStatus = document.querySelector("#status").value;
	if(userMedium === "tv"){
		if(userStatus === "started" || userStatus === "dropped"){
		document.querySelector("#statusForm").innerHTML = "<div class='form-group'><label for='watched'>Number of Episodes Watched: </label><input type='text' class='form-control' id='watched' /></div>"
		//document.querySelector("#statusForm").innerHTML += "<div class='form-group'><label for='length'>Length of Episode: </label><input type='text' class='form-control' id='length' /></div>"
		}
	} else if(userMedium === "game"){
		if(userStatus === "started" || userStatus === "dropped" || userStatus == "finished"){
		document.querySelector("#statusForm").innerHTML = "<div class='form-group'><label for='played'>Time Played(hours): </label><input type='text' class='form-control' id='played' /></div>"
		}

	} else if(userMedium === "book"){
		if(userStatus === "started" || userStatus === "dropped"){
		document.querySelector("#statusForm").innerHTML = "<div class='form-group'><label for='read'>Current Page: </label><input type='text' class='form-control' id='read' /></div>"

		}
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
	/*need to check for status to add 0 or number of episodes if not started or finished*/
	var userProgress = null;
	if (userMedium === "movie"){
		if(userStatus === "finished"){
		userProgress = 1;
		} else {
			userProgress = 0;
		}
		var userLength = document.querySelector("#length").value;
		var item = {title: userTitle, status: userStatus, length: userLength, numOfEpisodes: 1, progress: userProgress, medium: userMedium};
		userRef.child("movie/" + userTitle).update(item);
	} else if(userMedium === "tv"){
		var userLength = document.querySelector("#length").value;
		var userNumEpisodes = document.querySelector("#numEpisodes").value;
		if(userStatus === "finished"){
			userProgress = userNumEpisodes;
		} else if(userStatus === "started" || userStatus === "dropped"){
			userProgress = document.querySelector("#watched").value;
		} else {
			userProgress = 0;
		}
		var item = {title: userTitle, status: userStatus, length: userLength, numOfEpisodes: userNumEpisodes, progress: userProgress, medium: userMedium}
		userRef.child("tv/" + userTitle).update(item);
	} else if(userMedium === "game"){
		if(userStatus === "finished"){
			userProgress = document.querySelector("#played").value;
		} else if(userStatus === "started" || userStatus === "dropped"){
			userProgress = document.querySelector("#played").value;
		} else {
			userProgress = 0;
		}
		var item ={title: userTitle, status: userStatus, progress: userProgress, medium: userMedium};
		userRef.child("game/" + userTitle).update(item);
	} else if(userMedium === "book"){
		var userLength = document.querySelector("#length").value;
		if(userStatus === "finished"){
			userProgress = userLength;
		} else if(userStatus === "started" || userStatus === "dropped"){
			userProgress = document.querySelector("#read").value;
		} else {
			userProgress = 0;
		}
		var item = {title: userTitle, status: userStatus, length: userLength, progress: userProgress, medium: userMedium};
		userRef.child("book/" + userTitle).update(item);
	}
	//firebaseRef.unauth();
}
	//firebaseRef.push("jim");
}
var logoutButton = document.querySelector("#out");
logoutButton.addEventListener("click", logOut, false);
function logOut(){
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	firebaseRef.unauth();
	window.location.assign("logon.html");
}




}