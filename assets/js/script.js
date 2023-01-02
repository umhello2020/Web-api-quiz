// variables to contain quiz info globally
let liveQuestionIndex = 0;
let time = questions.length * 10;
let countdownId;

// global DOM variables
let questionsEl = document.getElementById('questions');
let choicesEl = document.getElementById('choices');
let countdownEl = document.getElementById('countdown');
let rightWrongEl = document.getElementById('right-wrong');
let startBtnEl = document.getElementById('start');
let submitBtnEl = document.getElementById('submit');
let initialsEl = document.getElementById('initials');

// function that begins the quiz
function startQuiz () {
    //hides start page
    let startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');

    //activates question page
    questionsEl.removeAttribute('class');

    //activate countdown and display it on the screen 
    countdownId = setInterval(finalTime, 1000);
    countdownEl.textContent = time;

    // call next function
    startQuestions();
}

// function that retrieves questions
function startQuestions() {
    // calls question index
    let liveQuestion = questions[liveQuestionIndex];

    // calls live question's title
    let titleEl = document.getElementById('title');
    titleEl.textContent = liveQuestion.title;

    // empty string to clear choices after previous run through
    choicesEl = '';

    // for loop to cycle through choices with button for each choice and sets a value for it
    for (let i = 0; i < liveQuestion.choices.length; i++) {
        let choice = liveQuestion.choices[i];
        let choiceNode = document.createAttribute('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice)
        
        //puts number in front of the choice option and displays it on screen
        choiceNode.textContent = i + 1 + '.' + choice;
        choicesEl.appendChild(choiceNode);
    };
        
}

// function that manages clicking on choice 
function clickBtn (event) {
    // create button element 
    let buttonEl = event.target;

    // conditional statements for the buttons
    if (buttonEl.value !== questions[liveQuestionIndex].answer) {
       // first subtract from time
       time -= 5;

       // time cannot be negative since game ends at zero
       if (time < 0) {
        time = 0
       };

       // countdown must reflect changes
       countdownEl.textContent = time;

       // feedback to tell if answer is wrong
        rightWrongEl.textContent = 'Wrong!';
        
        
    } else {
        // feedback display correct
        rightWrongEl.textContent = 'Correct!';
    };

    // give feedback a class to manipulate
    rightWrongEl.setAttribute('class', 'right-wrong');
    // set timeout function so feedback does not permanently stay on screen for less than a second
    setTimeout(function() {
        rightWrongEl.setAttribute('right-wrong', 'hide');
    }, 750);

    // move onto next question
    liveQuestionIndex++;

    // conditional statement if time ran out or end of quiz
    if (time = 0 || liveQuestionIndex == questions.length) {
        endQuiz();
    } else {
        startQuestions();
    };
}
 
// function to ensure time counts down and check for 0
function finalTime () {
    // conditional statement to update time
    if (time > 0) {
        time--;
        countdownEl.textContent = time;
    } else if (time <= 0) {
        endQuiz ();
    };
}

// function to end the quiz
function endQuiz () {
    // hide question page and display end page
    questionsEl.setAttribute('class', 'hide');

    let endPageEl = document.getElementById('end-page');
    endPageEl.removeAttribute('class');

    // clear countdown on page
    clearInterval(countdownId); 

    // display final score as remaining time
    finalScoreEl = document.getElementById
    finalScoreEl.textContent = time;
}



// left to do
// 2. function to end the quiz
// 3. function finalTime to update time and check if user ran out of time
// 4. function to save the highscore to storage
// 5. function to save score if user presses enter instead of clicking the button
// 6. create event listeners for submit and start buttons(click)
// 7. create event listeners for choices(click) and initials(enter key)