var killme=true;

var principal = 165000;
var interestRate = .045 / 12;
var numberOfMonths = 360;
var interestAmmount = interestRate * principal;
var monthlyPayment = (interestRate / (1 - Math.pow((1 + interestRate), -numberOfMonths))) * principal;
console.log(monthlyPayment);
for (var x = 0; x < numberOfMonths; x++){
	interestAmmount = interestRate * principal;
	principal = principal - (monthlyPayment - interestAmmount);
	console.log(x + " " + principal);
}