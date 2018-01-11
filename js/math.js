// JavaScript Document 
// 4/20/17
// 
// 
/*--------------------------------------------------------------------------------------------|
|	Project			Designers/Developers                                                      |
|---------------------------------------------------------------------------------------------|
|	Math Magician	Cheyenne von Kostka
|					Nicholas Kizer
|					Pablo Lomeli
|---------------------------------------------------------------------------------------------|
|	Date			Changes Made By			Changes											  |
|---------------------------------------------------------------------------------------------|
| 
|   4.20.17		 	Pablo Lomeli			I've commented out almost every single thing on this javascript file, I've covered all math symbol operations, validations for what symbols are used and if answers are right or wrong. I covered putting the right text on the html elements, grabbing the values off html elements and having the results display correctly. I implemented timer as mentioned below, different number generators for different types of math operations were made, disabling of the menu except the timer and start button, correct messages for answers inputted by user, and results show up correctly with counters and everything. Still needs bugs fixed.
|
|					Cheyenne von Kostka 	Timer funtion my creation, Pablo implimented, timer becomes 00:00 after finished tests within the 
|											results funtion. And disabled the ability to keep writting answers when timer ends
|
|                   Cheyenne von Kostka		Help implement the timer funtionality. 
|
|	4.24.17         Cheyenne von Kostka		timer becomes 00:00 after finished tests within the results funtion.              
|											Var typeTest didn't work, fixed it
|											Made percentage with no decimal
|
|	4.24.17			Pablo Lomeli			Reviewed code, commented out what almost every single thing does, and checked for bugs.
|											Current Bugs: - Start button will start without needed parameters.
|														- After pressing start, and then hitting the type of test button, it will reset the test
|														- Reset button should only be usuable after test results are shown
|											Fixed results() if statements starting on line 359 of redundent code. (disabling of user 
|											input in answer box).
|
|	4.25.17		Cheyenne von Kostka			Disabled time buttons while test is being taken
|											Disabled reset during tests, reenabled it after results shown
|											Attempted to get - to stop showing negative results, can't figure it out, random doesn't seem to want to do what I want it to do
|
|	4.25.17		Pablo Lomeli				Enabled validation for the main selection menu. Some progress on refining random number generator.
|
|
|	4.26.17		Cheyenne von Kostka			Subtraction was accepting null values as correct answers in case of 3-3 = 0; since parseInt took null as 0 LINE 395
|
|	4.26.17		Pablo Lomeli				Integrated specific random number generator for different types of math problems. Multiplication and addition do not need many validation
|											checks compared to the division and subtraction problems. Division is presumably done, subtraction still needs some work. After a few hours of
|											work, it is fully functional and subtracts correctly.
|
|	4.26.17		Pablo Lomeli				Started 100 Question Quiz code, do not debug anything it is not finished.
|   4.26.17		Pablo Lomeli				Many hours later, the 100 question quiz is finally done and fully implemented.
|	4.27.17		Pablo Lomeli				Fixed crucial bugs, advanced the subtraction algorithm so that all numbers are used for whatever number is chosen.
|
|---------------------------------------------------------------------------------------------*/
 
var menuitem1 = false;
var menuitem2 = false;
var menuitem3 = false;
var menuitem4 = false;
// Timer functions

// sets timer for 1 minute with 20 questions.
function settime1(){
 document.getElementById('timer').innerHTML =
  "01" + ":" + "00";
  document.getElementById("totalGiven").innerHTML = 20;
  menuitem3 = true;
}

// sets timer for 5 minute with 100 questions.
function settime5(){
	document.getElementById('timer').innerHTML =
	"05" + ":" + "00";
	document.getElementById("totalGiven").innerHTML = 100;
	alert("The 100 Question Quiz will start after you confirm this.");
	menuitem4 = true;
	theFiveMinuteQuiz();
}	

function grabRandomMathSign(n)
{
	var myMathSignArray = ['+', '-', '*', '/'];
	return myMathSignArray[n];
}

function theFiveMinuteQuiz()
{
	document.getElementById("timeBtn1").disabled = true;
	document.getElementById("timeBtn2").disabled = true;
	document.getElementById("submitButton").disabled = true;
	document.getElementById("reset").disabled = true;
	
	//these loops disable all the radio buttons
	var radios1 = document.getElementsByName('number');

	for (var i=0, iLen=radios1.length; i<iLen; i++) {
	  radios1[i].disabled = true;
	} 
	var radios2 = document.getElementsByName('mathSign');

	for (var i=0, iLen=radios2.length; i<iLen; i++) {
	  radios2[i].disabled = true;
	} 
	
	var randMathSign = grabRandomMathSign(Math.floor((Math.random() * 4) + 1) - 1);
	document.getElementById("mathSign").innerHTML = randMathSign;
	//sets the game menu's selected symbols
	var currentMathSign = document.getElementById("mathSign").innerHTML;
	document.getElementById("mathSignHIDDEN").innerHTML = currentMathSign;
	
	if(currentMathSign == "*")
	{
		document.getElementById("mathSign").innerHTML = "&times";
	}
	if(currentMathSign == "/")
	{
		document.getElementById("mathSign").innerHTML = "&divide";
	}
	
	document.getElementById("testing").disabled = false;
	
	var selectedNumber = Math.floor((Math.random() * 12) + 1);
	document.getElementById("chosenNumberHIDDEN").value = selectedNumber;
	
	if(currentMathSign == "+" || currentMathSign == "*")
	{
		document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
		// Random number generator (Needs refinement most likely)
		var ranNum = Math.floor((Math.random() * 12) + 1);
		document.getElementById("randomNumber").value = ranNum;
	}
	else if(currentMathSign == "-")
	{
		if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
		
		
	}
	else if(currentMathSign == "/")
	{
			document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
			function GetRandomNumberBetween(lo, hi) {
			  return Math.floor((Math.random() * (hi)) + lo);
			}
			
			Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
			  return Math.round(this / n) * n; 
			  //simplify as per Guffa
			};
			var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
			var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
			while( c > 12 * selectedNumber || c == 0)
			{
				var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
				var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
			}
			document.getElementById("randomNumber").value = c;
		
	}
	//This initiates the timer and puts the focus on the answer box so that the user can start fast.
	startTimer();
	document.getElementById("testing").focus();
	
	
}

//this function handles making the timer have a 0 in the last 9 seconds of the timer.
function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
	if (sec < 0) {sec = "59"};
  return sec;
}

// starts the timer, and continueally degrades it so that it will reach 0, it will then run the results function when it reaches 0.
function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0)
  	{
		results();
	  	return; 
	}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

// insert function that grabs the number selected from the list of numbers
function insertData(){
	
	//Gets the radio button's that are selected and puts them into the corresponding html components.
	var radios1 = document.getElementsByName('number');
	var radios2 = document.getElementsByName('mathSign');

	// this loop will look for checked radio button.
	for (var i = 0, length = radios1.length; i < length; i++) {
		if (radios1[i].checked) {
			// Sets the html element to match the picked radio button.
			//document.getElementById("chosenNumber").value = radios1[i].value;
			document.getElementById("chosenNumberHIDDEN").value = radios1[i].value;
			menuitem1 = true;
			// only one radio can be logically checked, don't check the rest
			break;
		}
	}
	for (var i = 0, length = radios2.length; i < length; i++) {
		if (radios2[i].checked) {
			// Sets the html elements to match the picked radio button.
			//document.getElementById("mathSign").innerHTML = radios2[i].value;
			document.getElementById("mathSignHIDDEN").innerHTML = radios2[i].value;
			// only one radio can be logically checked, don't check the rest
			menuitem2 = true;
			break;
		}
	}
	
	if(menuitem1 == true && menuitem2 == false && menuitem3 == false)
	{
		alert("You need a math sign and time. Or select 5 minute quiz only.")
	}
	if(menuitem1 == true && menuitem2 == true && menuitem3 == false)
	{
		alert("You need a time.")
	}
	if(menuitem1 == false && menuitem2 == true && menuitem3 == false)
	{
		alert("You need a number and time.")
	}
	if(menuitem1 == false && menuitem2 == true && menuitem3 == true)
	{
		alert("You need a number.")
	}
	if(menuitem1 == true && menuitem2 == false && menuitem3 == true)
	{
		alert("You need a math sign.")
	}
	if(menuitem1 == false && menuitem2 == false && menuitem3 == true)
	{
		alert("You need a number, and a math sign.")
	}
	if(menuitem1 == false && menuitem2 == false && menuitem3 == false)
	{
		alert("You need a number, a math sign, and time.")
	}
	
	if(menuitem1 == true && menuitem2 == true && menuitem3 == true)
	{
		//alert("All selections are correct, test will begin after confirming this.");
		document.getElementById("timeBtn1").disabled = true;
		document.getElementById("timeBtn2").disabled = true;
		document.getElementById("reset").disabled = true;
		document.getElementById("mathSign").innerHTML = document.getElementById("mathSignHIDDEN").innerHTML;
		//sets the game menu's selected symbols
		var currentMathSign = document.getElementById("mathSign").innerHTML;
		
		if(currentMathSign == "*")
		{
			document.getElementById("mathSign").innerHTML = "&times";
		}
		if(currentMathSign == "/")
		{
			document.getElementById("mathSign").innerHTML = "&divide";
		}
		
		//Disables menu so test may begin.
		document.getElementById("submitButton").disabled = true;
		document.getElementById("testing").disabled = false;
		
		//these loops disable all the radio buttons
		var radios1 = document.getElementsByName('number');
	
		for (var i=0, iLen=radios1.length; i<iLen; i++) {
		  radios1[i].disabled = true;
		} 
		var radios2 = document.getElementsByName('mathSign');
	
		for (var i=0, iLen=radios2.length; i<iLen; i++) {
		  radios2[i].disabled = true;
		} 
		
		var selectedNumber = document.getElementById("chosenNumberHIDDEN").value;	
		if(currentMathSign == "+" || currentMathSign == "*")
		{
			document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
			// Random number generator (Needs refinement most likely)
			var ranNum = Math.floor((Math.random() * 12) + 1);
			document.getElementById("randomNumber").value = ranNum;
		}
		else if(currentMathSign == "-")
		{
			var ranNum = Math.floor((Math.random() * 12) + 1);
						
						if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
			
			
		}
		else if(currentMathSign == "/")
		{
				document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
				function GetRandomNumberBetween(lo, hi) {
				  return Math.floor((Math.random() * (hi)) + lo);
				}
				
				Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
				  return Math.round(this / n) * n; 
				  //simplify as per Guffa
				};
				var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
				var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
				while( c > 12 * selectedNumber || c == 0)
				{
					var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
					var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
				}
				document.getElementById("randomNumber").value = c;
			
		}
		//This initiates the timer and puts the focus on the answer box so that the user can start fast.
		startTimer();
		document.getElementById("testing").focus();
	}

}



// this uses the enter button to submit the answer
function onTestChange() 
{
    var key = window.event.keyCode;

    // If the user has pressed enter
    if (key === 13) 
	{
		if(menuitem4 == true)
		{
			var testSolution = calculationFunction2();
			if(testSolution == true)
			{
			
				document.getElementById("testing").value = "";
				var answer = "correct";
				showResult(answer);
				
				var randMathSign = grabRandomMathSign(Math.floor((Math.random() * 4) + 1) - 1);
				document.getElementById("mathSign").innerHTML = randMathSign;
				//sets the game menu's selected symbols
				var currentMathSign = document.getElementById("mathSign").innerHTML;
				document.getElementById("mathSignHIDDEN").innerHTML = currentMathSign;

				if(currentMathSign == "*")
				{
					document.getElementById("mathSign").innerHTML = "&times";
				}
				if(currentMathSign == "/")
				{
					document.getElementById("mathSign").innerHTML = "&divide";
				}

				document.getElementById("testing").disabled = false;

				var selectedNumber = Math.floor((Math.random() * 12) + 1);
				document.getElementById("chosenNumberHIDDEN").value = selectedNumber;

				if(currentMathSign == "+" || currentMathSign == "*")
				{
					document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
					// Random number generator (Needs refinement most likely)
					var ranNum = Math.floor((Math.random() * 12) + 1);
					document.getElementById("randomNumber").value = ranNum;
				}
				else if(currentMathSign == "-")
				{
					var ranNum = Math.floor((Math.random() * 12) + 1);
						
						if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}


				}
				else if(currentMathSign == "/")
				{
						document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						function GetRandomNumberBetween(lo, hi) {
						  return Math.floor((Math.random() * (hi)) + lo);
						}

						Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
						  return Math.round(this / n) * n; 
						  //simplify as per Guffa
						};
						var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
						var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
						while( c > 12 * selectedNumber || c == 0)
						{
							var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
							var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
						}
						document.getElementById("randomNumber").value = c;

				}
				
				
			}
			if(testSolution == false)
			{
				document.getElementById("testing").value = "";
				var answer = "wrong";
				showResult(answer);
				
				var randMathSign = grabRandomMathSign(Math.floor((Math.random() * 4) + 1) - 1);
				document.getElementById("mathSign").innerHTML = randMathSign;
				//sets the game menu's selected symbols
				var currentMathSign = document.getElementById("mathSign").innerHTML;
				document.getElementById("mathSignHIDDEN").innerHTML = currentMathSign;

				if(currentMathSign == "*")
				{
					document.getElementById("mathSign").innerHTML = "&times";
				}
				if(currentMathSign == "/")
				{
					document.getElementById("mathSign").innerHTML = "&divide";
				}

				document.getElementById("testing").disabled = false;

				var selectedNumber = Math.floor((Math.random() * 12) + 1);
				document.getElementById("chosenNumberHIDDEN").value = selectedNumber;

				if(currentMathSign == "+" || currentMathSign == "*")
				{
					document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
					// Random number generator (Needs refinement most likely)
					var ranNum = Math.floor((Math.random() * 12) + 1);
					document.getElementById("randomNumber").value = ranNum;
				}
				else if(currentMathSign == "-")
				{
					var ranNum = Math.floor((Math.random() * 12) + 1);
						
						if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}

				}
				else if(currentMathSign == "/")
				{
						document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						function GetRandomNumberBetween(lo, hi) {
						  return Math.floor((Math.random() * (hi)) + lo);
						}

						Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
						  return Math.round(this / n) * n; 
						  //simplify as per Guffa
						};
						var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
						var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
						while( c > 12 * selectedNumber || c == 0)
						{
							var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
							var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
						}
						document.getElementById("randomNumber").value = c;

				}
			}
			
		}
		else if(menuitem4 == false)
		{
			//This will grab the value of either true or false to check if user input was right or wrong.
			var testSolution = calculationFunction();
			// this runs when user was right.
			if(testSolution == true)
			{
				// calls score function to count the answer right.
				currentMathSign = document.getElementById("mathSignHIDDEN").innerHTML;
				// checks to see which random number generator to use. and gives answer related message back to user.
				
				var selectedNumber = document.getElementById("chosenNumberHIDDEN").value;	
				
				if(currentMathSign == "+" || currentMathSign == "*")
				{
					// Random number generator (Needs refinement most likely)
					var ranNum = Math.floor((Math.random() * 12) + 1);
					document.getElementById("randomNumber").value = ranNum;
					//alert("Answer was right and this ran good")
					document.getElementById("testing").value = "";
					var answer = "correct";
					showResult(answer);
				}
				else if(currentMathSign == "-")
				{
						
						var ranNum = Math.floor((Math.random() * 12) + 1);
						
						if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						
					
					//alert("Answer was right and this ran good")
					document.getElementById("testing").value = "";
					var answer = "correct";
					showResult(answer);
				}
				
					
				else if(currentMathSign == "/")
				{
					//start of a random number generator thats divisible by the number selected
					var selectedNumber = document.getElementById("chosenNumber").value;
					function GetRandomNumberBetween(lo, hi) {
					  return Math.floor((Math.random() * (hi)) + lo);
					}
					
					Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
					  return Math.round(this / n) * n; 
					  //simplify as per Guffa
					};
					var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
					var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
					while( c > 12 * selectedNumber || c == 0)
					{
						var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
						var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
					}
					document.getElementById("randomNumber").value = c;
					//alert("Answer was right and this ran good (division")
					document.getElementById("testing").value = "";
					var answer = "correct";
					showResult(answer);
					
				}
			}
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			else if(testSolution == false)
			{
				//grabs math sign to work with picking the right number generator. This is also the wrong answer section.
				currentMathSign = document.getElementById("mathSignHIDDEN").innerHTML;
				// checks to see which random number generator to use. and gives answer related message back to user.
				
				
				var selectedNumber = document.getElementById("chosenNumberHIDDEN").value;	
				if(currentMathSign == "+" || currentMathSign == "*")
				{
					// Random number generator (Needs refinement most likely)
					var ranNum = Math.floor((Math.random() * 12) + 1);
					document.getElementById("randomNumber").value = ranNum;
					//alert("Answer was wrong and this ran good")
					document.getElementById("testing").value = "";
					var answer = "wrong";
					showResult(answer);
				}
				else if(currentMathSign == "-")
				{
						var ranNum = Math.floor((Math.random() * 12) + 1);
						
						if(ranNum >= selectedNumber)
						{
							document.getElementById("randomNumber").value = ranNum;
							document.getElementById("chosenNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						else
						if(selectedNumber > ranNum )
						{
							document.getElementById("chosenNumber").value = ranNum;
							document.getElementById("randomNumber").value = document.getElementById("chosenNumberHIDDEN").value;
						}
						
					document.getElementById("testing").value = "";
					var answer = "wrong";
					showResult(answer);
				}
				
				
				else if(currentMathSign == "/")
				{
					//start of a random number generator thats divisible by the number selected
					var selectedNumber = document.getElementById("chosenNumber").value;
					function GetRandomNumberBetween(lo, hi) {
					  return Math.floor((Math.random() * (hi)) + lo);
					}
					
					Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
					  return Math.round(this / n) * n; 
					  //simplify as per Guffa
					};
					var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
					var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
					while( c > 12 * selectedNumber || c == 0)
					{
						var r = GetRandomNumberBetween(selectedNumber, (12 * selectedNumber));
						var c = r.FindClosestNumberThatIsDivisibleBy(selectedNumber);
					}
					document.getElementById("randomNumber").value = c;
					//alert("Answer was wrong and this ran good (division")
					document.getElementById("testing").value = "";
					var answer = "wrong";
					showResult(answer);
					
				}		
			}
		}
	}
}


function calculationFunction() {
	// grabs all values to be used for the calculation
	var userInput = document.getElementById("testing").value;
	var firstNumber = document.getElementById("randomNumber").value;
	var secondNumber = document.getElementById("chosenNumber").value;
	var mathSign = document.getElementById("mathSignHIDDEN").innerHTML;
	var answer = userInput;
	var mathSignJS = mathSign;
	parseInt(answer);
	
	// 4 if statements to catch what math sign there is to use.
	if (mathSignJS == "+")
	{
		var solution = parseInt(firstNumber) + parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
		
	}
	
	if (mathSignJS == "-")
	{
		if(answer == '')
		{
			return false;	
		}
		
		var solution = parseInt(firstNumber) - parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	if (mathSignJS == "*")
	{
		
		var solution = parseInt(firstNumber) * parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	if (mathSignJS == "/")
	{
		
		var solution = parseInt(firstNumber) / parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	
	return false;
	
}

function calculationFunction2() {
	// grabs all values to be used for the calculation
	var userInput = document.getElementById("testing").value;
	var firstNumber = document.getElementById("randomNumber").value;
	var secondNumber = document.getElementById("chosenNumber").value;
	var mathSign = document.getElementById("mathSignHIDDEN").innerHTML;
	var answer = userInput;
	var mathSignJS = mathSign;
	parseInt(answer);
	
	// 4 if statements to catch what math sign there is to use.
	if (mathSignJS == "+")
	{
		var solution = parseInt(firstNumber) + parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
		
	}
	
	if (mathSignJS == "-")
	{
		if(answer == '')
		{
			return false;	
		}
		
		var solution = parseInt(firstNumber) - parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	if (mathSignJS == "*")
	{
		
		var solution = parseInt(firstNumber) * parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	if (mathSignJS == "/")
	{
		
		var solution = parseInt(firstNumber) / parseInt(secondNumber);
		if(answer == solution)
		{
			return true;
		}
	}
	
	
	return false;
	
}

//counter feature coding below
var rightcounter = 0;
var counter = 0;
	 
// This function will deliever the correct corresponding response message for the answer inputted.
function showResult(answerInput) {
	// This will have the message stay for 1 second.
	var delayMillis = 1000; //1 second

	// if statments to cover the two possible solutions from user input. Future version will probably have one for input other than numbers.
	if(answerInput == "correct")
	{
		// if its right it will count the amount right and will add for the total counter to catch the right amount of problems done.
		rightcounter++;
		counter++;
		document.getElementById("answerNotification").innerHTML = "Good job!";
		// this function handles the delay and display of the message.
		setTimeout(function() {
	  	document.getElementById("answerNotification").innerHTML = "";
		}, delayMillis);
		
		document.getElementById("currentAnswered").innerHTML = counter;
		
	}
	
	if(answerInput == "wrong")
	{
		counter++;
		document.getElementById("answerNotification").innerHTML = "Wrong!";
		
		setTimeout(function() {
	  	document.getElementById("answerNotification").innerHTML = "";
		}, delayMillis);
		
		document.getElementById("currentAnswered").innerHTML = counter;
	}
	
	// these if statements will check to see if the counter has hit the required amount and will check to make sure the right test is 
	// selected. Then show results. Also the quiz numbers are removed.
	if(counter == 20 && document.getElementById("totalGiven").innerHTML == 20)
	{
		
		document.getElementById("randomNumber").value = "";
		document.getElementById("chosenNumber").value = "";
		results();
	}
	if(counter == 100 && document.getElementById("totalGiven").innerHTML == 100)
	{
		
		document.getElementById("randomNumber").value = "";
		document.getElementById("chosenNumber").value = "";
		results();
	}
	
	
}


// results feature coded below
function results()
{
		// this will show the results for the 20 questions test.
	if(document.getElementById("totalGiven").innerHTML == 20)
	{
		document.getElementById('timer').innerHTML = "00" + ":" + "00";
		document.getElementById("randomNumber").value = "";
		document.getElementById("chosenNumber").value = "";
		document.getElementById("testing").disabled = true;
		document.getElementById("reset").disabled = false; 
		var results = rightcounter / 20;
		results = results * 100;
		document.getElementById("testResults").innerHTML = results.toFixed(0) + "%";
		
	}
	// this will show the results for the 100 questions test.
	if(document.getElementById("totalGiven").innerHTML == 100)
	{
		document.getElementById('timer').innerHTML = "00" + ":" + "00";
		document.getElementById("randomNumber").value = "";
		document.getElementById("chosenNumber").value = "";
		document.getElementById("testing").disabled = true;
		document.getElementById("reset").disabled = false;
		var results = rightcounter / 100;
		results = results * 100;
		document.getElementById("testResults").innerHTML = results.toFixed(0) + "%";
		
	}
}


