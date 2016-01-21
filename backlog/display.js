$(document).ready(function() {
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	var user = firebaseRef.getAuth();
	var userRef = firebaseRef.child(user.uid);
	var userID = user.uid;
  	/*instead make the drop down thing work by giving a hidden tab and make a button make it unhidden*/
	var movieRef = userRef.child("movie")
	movieRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var movieTable = $("#tableMovie");
		movieTable.append("<tr><td>" + data.title + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
		//console.log(data.title);
	});
	var bookRef = userRef.child("book")
		bookRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var movieTable = $("#tableBook");
		movieTable.append("<tr><td>" + data.title + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
		//console.log(data.title);
	});
	var gameRef = userRef.child("game")
		gameRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var movieTable = $("#tableGame");
		movieTable.append("<tr><td>" + data.title + "</td><td>" + data.status + "</td></tr>")
		//console.log(data.title);
	});
	var tvRef = userRef.child("tv")
		tvRef.orderByChild(userID).on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		var movieTable = $("#tableTv");
		movieTable.append("<tr><td>" + data.title + "</td><td>" + data.numOfEpisodes + "</td><td>" + data.length + "</td><td>" + data.status + "</td></tr>")
		//console.log(data.title);
	});
	$("#out").click(function(){
		firebaseRef.unauth();
		window.location.assign("logon.html");
	});
});