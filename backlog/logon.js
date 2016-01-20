$(document).ready(function() {
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
	$("#submit").click(function(){
		var name = $("#username").val();
		var pass = $("#password").val();
		firebaseRef.createUser({
			email: name, password: pass
		}, function(error, userData) {
		  	if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		  }
		});
	});

	$("#login").click(function(){
		var username = $("#usname").val();
		var userpass = $("#uspass").val();
		firebaseRef.authWithPassword({
			email: username, password: userpass, remember: "sessionOnly"
		},  function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			}); 
	});

});
