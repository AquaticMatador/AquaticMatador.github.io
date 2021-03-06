$(document).ready(function() {
	var firebaseRef = new Firebase("https://tsundoku.firebaseio.com/");
		  $("#username").val("");
		  $("#password").val("");
		  $("#usname").val("");
		  $("#uspass").val("");
	$("#submit").click(function(){
		var name = $("#username").val();
		var pass = $("#password").val();
		firebaseRef.createUser({
			email: name, password: pass
		}, function(error, userData) {
		  	if (error) {
		    console.log("Error creating user:", error);
		    $("#success").text("");
		    $("#fail").text("Registration Was Not Successfull, please try again");
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    $("#fail").text("");
		    $("#success").text("Registration Was Successfull, please login");
		  }
		  $("#username").val("");
		  $("#password").val("");
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
			    $("#failLog").text("Login Was Not Successfull, please try again");
			  } else {
			    //console.log("Authenticated successfully with payload:", authData);
			    window.location.assign("showTable.html");
			  }
			}, {
				remember: "sessionOnly"
			}); 
	});

});
