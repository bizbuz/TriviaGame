

var maxTime = 7; 
var counter = 0;
var timeLeft = maxTime; 
//var timeUp = false; 
//var doneClicked = false ; 
//var timeStarted = false; 
var interval ; 
var selectedValue; 
var correctOption; 
var selectedId ; 
var wrongs = 0 ; 
var rights = 0 ; 
var rightAnswer = false; 

var questionBank = [
{ Q:"How long a memory do Goldfish have", A1: "3 second", A2: "5 mins", A3: "3 weeks", A4: "5 months"},
{ Q:"In which state is it illegal to catch mice without a hunting license", A1: "New York",A2: "Georgia", A3: "Indiana", A4: "Ohio" },
{ Q:"What is a group of Unicorns called", A1:"A Shining", A2:"A Blessing", A3:"A Favor 	An Umbra", A4: "Watever" }];

var answerBank = ["5 months", "Ohio", "A Blessing"];

function resetTimer(){
	timeLeft = maxTime; 
	$('#displayTimer').val(maxTime);
}

function startTimer(){
	//timeStarted = true; 
	//timeUp = false; 
	interval = setInterval(displayTimeLeft, 1000); 

}

function stopTimer(){
	clearInterval(interval); 
	//timeStarted = false; 

}

function displayTimeLeft(){
	$('#displayTimer').val(timeLeft); 
	timeLeft --	
	if(timeLeft < 0 ){
			//timeUp = true; 
			$('#displayTimer').val('Time Out !'); 
			stopTimer();
			//validate answer  
			rightAnswer = validateAnswer(); 
			//Update score 
			updateScore(rightAnswer); 
			//Increase counter
			counter++; 
			//wait for 3 seconds and display the next question 
			if(counter< questionBank.length){
				setTimeout(displayQnA, 3000, counter ); 
			}
			else
			document.write('wrongs:' + wrongs + 'rights:' + rights ); 
	}
	
}

function displayQnA(counter){
	
	resetTimer(); 
	$('input[name=Answer]:radio').prop('checked', false); 
	$('#displayQuestion').val(questionBank[counter].Q); 
	$('#Option1').next().text(questionBank[counter].A1); 
	$('#Option2').next().text(questionBank[counter].A2); 
	$('#Option3').next().text(questionBank[counter].A3); 
	$('#Option4').next().text(questionBank[counter].A4); 

	startTimer(); 
}

function correctAnswer(correctAnswer){
	return correctAnswer; 
}

function validateAnswer(){
	
	//if no radio is selected mark as incorrect 	
	for(var i = 0; i< $('input[name=Answer]:radio').length; i ++){
		//if radio is selected 
		if ($('input[name=Answer]:radio')[i].checked){
			checked = true ; 
			//get the radio id option selected 
			selectedId = '#'+ $('input[name=Answer]:radio')[i].id
			//get the label text of that radio id
			selectedValue = $(selectedId).next().text();
			//check if the answer exists in answerBank 
			correctOption = answerBank.find(correctAnswer) ; 
			//if yes , update score 
			if(selectedValue == correctOption){
				rightAnswer = true; 
				return rightAnswer; 
			}
			
		}
		
	}

}

function updateScore(rightAnswer){
	if (rightAnswer){
		console.log('Yay!'); 
		rights += 1;
	}
	else
		console.log('Nay!'); 
		wrongs += 1;
}

//Call the required functions
displayQnA(counter); 

$('#doneButton').on('click', function(){
	//stop timer 
	stopTimer();  
	//validate answer  
	rightAnswer = validateAnswer(); 
	//Update score 
	updateScore(rightAnswer); 
	//increase counter 
	counter++; 
	//wait for 3 seconds and display the next question 
	if(counter< questionBank.length){
		setTimeout(displayQnA, 3000, counter ); 
	}
	else
		document.write('wrongs:' + wrongs + 'rights:' + rights ); 
}); 
