
/*
for all questions in the questions  bank 
// Reset Timer 
1. Display Question
2. Display Answers
3. Start timer 
4. If Time Up or If Done button Clicked 
-> Stop Timer  & Clear Timer 
-> Check if the answer selected is correct 
- > Calculate score

if counter is greater than length then display score 

*/
var maxTime = 5; 
var counter = 0;
var timeLeft = maxTime; 
var timeUp = false; 
var doneClicked = false ; 
var timeStarted = false; 
var interval ; 
var selectedValue; 
var correctOption; 
var selectedId ; 
var wrongs = 0 ; 
var rights = 0 ; 

var questionBank = [
{ Q:"How long a memory do Goldfish have", A1: "3 second", A2: "5 mins", A3: "3 weeks", A4: "5 months"},
{ Q:"In which state is it illegal to catch mice without a hunting license", A1: "New York",A2: "Georgia", A3: "Indiana", A4: "Ohio" },
{ Q:"What is a group of Unicorns called", A1:"A Shining", A2:"A Blessing", A3:"A Favor 	An Umbra", A4: "Watever" }];

var answerBank = ["5 months", "Ohio", "A Blessing"];

function resetTimer(){
	$('#displayTimer').val(maxTime);
}

function startTimer(){
	timeStarted = true; 
	timeUp = false; 
	interval = setInterval(displayTimeLeft, 1000); 

}

function stopTimer(){
	clearInterval(interval); 
	timeStarted = false; 

}

function displayTimeLeft(){
	$('#displayTimer').val(timeLeft); 
	timeLeft --	
	if(timeLeft < 0 )
		{
			timeUp = true; 
			$('#displayTimer').val('Time Out !'); 
			stopTimer(); 
		}
}

function displayQnA(counter){
	resetTimer(); 
	$('#displayQuestion').val(questionBank[counter].Q); 
	$('#Option1').next().text(questionBank[counter].A1); 
	$('#Option2').next().text(questionBank[counter].A2); 
	$('#Option3').next().text(questionBank[counter].A3); 
	$('#Option4').next().text(questionBank[counter].A4); 
}

function correctAnswer(correctAnswer){
	return correctAnswer; 
}

function validateAnswer(){
	
	//if no radio is selected mark as incorrect 
	for(var i = 0; i< $('input[name=Answer]:radio').length; i ++){
		//if radio is selected 
		if ($('input[name=Answer]:radio')[i].checked){
			//get the radio id option selected 
			selectedId = '#'+ $('input[name=Answer]:radio')[i].id
			//get the label text of that radio id
			selectedValue = $(selectedId).next().text();
			//check if the answer exists in answerBank 
			correctOption = answerBank.find(correctAnswer) ; 
			//if yes , update score 
			if(selectedValue == correctOption){
				console.log('Yay!'); 
				rights += 1; 
			}
			else if(selectedValue != correctOption){
				// update score 
				console.log('Nay !') ;
				wrongs += 1;
			}

		}

		else
			console.log('Nay !') ;
			wrongs += 1;

	}

}

//Call the required functions
displayQnA(counter); 
startTimer(); 
$('#doneButton').on('click', function(){
	//stop timer 
	stopTimer();  
	//validate answer  & Update Score 
	validateAnswer(); 
	//increase counter 
	counter++; 
	//wait for 2 seconds and display the next question 
	if(counter< displayQuestion.length){
		setTimeout(displayQnA(counter), 2000); 
		timeLeft = maxTime; 
		startTimer(); 
	}
	else
		document.write('wrongs:' + wrongs + 'rights:' + rights ); 
}); 
