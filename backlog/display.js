$(document).ready(function() {
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	firebaseRef.orderByChild("name/lastName").on("child_added", function(snapshot, previousNeighborId) {
		var obj = snapshot.val();
		var table = $("#table");
		var user = firebaseRef.getAuth();
		var userID = user.uid;
		table.append("<tr><td>" + userID.obj.item.title + "</td><td>" + userID.obj.item.medium + "</td><td>" + userID.obj.item.status + "</td></tr>")
	});
});