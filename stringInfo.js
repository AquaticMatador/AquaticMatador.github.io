//var userString = prompt("egrht");
var userString = "cat fat sat cat sat the fuck is this shit";
stringInfo(userString);
var something = [];
if(isNaN(something[0])){
	console.log("adsgfdsd");
}

function stringInfo(userString){
	var retVal = {total: 0, occurences: [[]], distinct: 0, fewest:[], most: []};
	var splitString = userString.split(" ");
	var arrayYo[[]];
	retVal.total = splitString.length;
	for(var x = 0; x < splitString.length; x++){
		var boolShit = false;
		for(var y = 0; y < arrayYo.length; y++){
			if(splitString[x] == arrayYo[y][0]){
				arrayYo[y][1] = arrayYo[y][1] + 1;
				boolShit = true;
			}
		}
		if(boolShit){
			arrayYo[arrayYo.length][0];
		}
	}
	
}