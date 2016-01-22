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
		movieTable.after("<tr class='" + getColor + "'><td class='edit'>" + data.title + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
		timeSpent.text(timeSpentMovie + " minutes");
		timeSpend.text(timeSpendMovie + " minutes");
		//console.log(data.title);
	});
	var bookRef = userRef.child("book")
		bookRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var bookTable = $("#tableBook");
		var getColor = colorGetter(data);
		bookTable.append("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
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
		gameTable.after("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.status + "</td></tr>")
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
		tvTable.after("<tr class='" + getColor + "'><td>" + data.title + "</td><td>" + data.progress + "</td><td>" + data.numOfEpisodes + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
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
