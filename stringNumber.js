var bullshit = 123;
convert(bullshit);

function convert(number){
	var size = number.length;
	//var eachNumber = number.split("");
	var numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
	//var theConverted = [];
	var stringnum = number.toString();
	console.log(stringnum);
	var ass = stringnum.split("");
	console.log(ass.length);
	console.log(ass[0]);
	console.log(ass[1]);
	console.log(ass[2]);
	
}