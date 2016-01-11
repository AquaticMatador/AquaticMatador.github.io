for(z = 0; z < 100; z++){
	if(isPrime(z)){
		console.log(z + " Is prime");
	}
	/*
	else{
		console.log(z + " Is not Prime");
	}
	*/
}



function isPrime(num){
	var isPrime = true;
	for(x = 2; x <= num / 2; x++)
	{
		if(num % x === 0)
		{
			isPrime = false;
		}
	}
	return isPrime;
}