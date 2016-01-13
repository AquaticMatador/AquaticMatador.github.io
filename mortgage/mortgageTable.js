//Get submit element
var submitButton = document.querySelector("#submit");
//Get reset element
var resetButton = document.querySelector("#reset");

//Checks for click
submitButton.addEventListener("click", createTable, false);
resetButton.addEventListener("click", clearTable, false);

function validateForm(x) {
    if (x == null || x == "" || x < 0) {

    }
    else{
    	return true;
    }
}

function createTable(event){
	//gets data from form and preps variables
	var principal = document.querySelector("#principal").value;
	//validate user input
	if(!validateForm(principal)){
		alert("Principal must be a positive numeric value");
        return false;
	}
	var interestRate = (document.querySelector("#interestRate").value / 100) / 12;
	if(!validateForm(interestRate)){
		alert("Interest Rate must be a positive numeric value");
    	return false;
	}
	var numberOfMonths = document.querySelector("#years").value * 12;
	var principalInitial = principal;
	var interestAmmount = interestRate * principal;
	var monthlyPayment = (interestRate / (1 - Math.pow((1 + interestRate), -numberOfMonths))) * principal;
	var totalPaid = 0;
	var totalInterestPaid = 0;
	//table spans 5 columns, <th> are declared here
	var monthTable = "<table class='table table-striped table-bordered table-responsive'><th>Month</th><th>Monthly Payment</th><th>Principle Paid</th><th>Interest Paid</th><th>Amount Remaining</th>"
	for (var x = 0; x < numberOfMonths; x++){
		interestAmmount = interestRate * principal;
		principal = principal - (monthlyPayment - interestAmmount);
		//Check if start of new year
		if(x % 12 === 0){
			//Creates new row with year number also gives id equal to month
			monthTable += "<tr id='" + (x+1) +  "'><td>" +  (x + 1) + ", year " + ((x / 12) + 1) + "</td>";
		} else{
			//creates new row with id equal to month
			monthTable += "<tr id='" + (x+1) +  "'><td>" +  (x + 1) + "</td>";
		}
		//adds data for each colum and closes row
		monthTable += "<td>" + (monthlyPayment.toFixed(2)) + "</td>";
		monthTable += "<td>" + (monthlyPayment - interestAmmount).toFixed(2) + "</td>";
		monthTable += "<td>" + interestAmmount.toFixed(2) + "</td>";
		monthTable += "<td>" + (principal.toFixed(2)) + "</td></tr>";
		totalPaid = totalPaid + monthlyPayment;
		totalInterestPaid = totalInterestPaid + interestAmmount;
	}




	//Calculating percentage paid for summary table
	var percentagePaid = (totalInterestPaid / totalPaid) * 100;
	//This makes the summary data table. Due to javascript, line breaks are not allowed so its every row and column on one line
	var table = "<table class='table table-striped table-bordered table-responsive'><tr><td>Loan Ammount</td><td>" + principalInitial + "</td></tr>" + "<tr><td>Monthly Interest Rate</td><td>" + (interestRate * 100).toFixed(2) + "%</td></tr>" +"<tr><td>Monthly Payment</td><td>" + monthlyPayment.toFixed(2) + "</td></tr>" +"<tr><td>Total Ammount Paid</td><td>" + totalPaid.toFixed(2) + "</td></tr>" +"<tr><td>Total Interest Paid</td><td>" + totalInterestPaid.toFixed(2) + "</td></tr>" +"<tr><td>Percentage Interest Paid</td><td>" + percentagePaid.toFixed(2) + "%</td></tr></table>";
	
	//outputting sumary table to page
	document.querySelector("#data").innerHTML = table;

	//outputting monthly payment schedule table to page
	document.querySelector("#paymentTable").innerHTML = monthTable;
	
	//Hiding unwanted values
	var range = document.querySelector("#displayRange").value;
	var arrRange = range.split("-");
	var start = Number(arrRange[0]);
	var end = Number(arrRange[1]);
	//document.getElementById(arrRange[0]).innerHTML += "<div style='display: none;'>";
	if(start === 1){
		for(var x = end + 1; x <= numberOfMonths; x++){
			strX = x.toString();
			document.getElementById(strX).style.display ='none' 
		}
	} else if(end === numberOfMonths){
			for(var x = 1; x < start; x++){
				strX = x.toString();
				document.getElementById(strX).style.display ='none' 
			}
	} else if (start > 1 && end < numberOfMonths){
		for(var x = 1; x < start; x++){
			strX = x.toString();
			document.getElementById(strX).style.display ='none' 
		}
		for(var x = end + 1; x <= numberOfMonths; x++){
			strX = x.toString();
			document.getElementById(strX).style.display ='none' 
		}
	}








	//document.getElementById("46").style.display ='none' 
	

}
function clearTable(event){
	//variable for the summary table
	var outputDiv = document.querySelector("#data");

	//Variable for the schedule table
	var outputDivTwo = document.querySelector("#paymentTable");

	//Clears both tables
	outputDiv.innerHTML = "";
	outputDivTwo.innerHTML = "";


}