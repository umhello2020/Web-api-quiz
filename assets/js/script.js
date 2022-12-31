// variables to contain quiz info globally
let liveQuestionIndex = 0;
let time = questions.length * 5;
let countdown;

// DOM variables
let questionsEl = document.getElementById('questions');
let choicesEl = document.getElementById('choices');
let countdownEl = document.getElementById('countdown');
let rightWrongEl = document.getElementById('right-wrong');
let startBtnEl = document.getElementById('start');
let submitBtnEl = document.getElementById('submit');
let initialsEl = document.getElementById('initials');

//function that begins the quiz
function startQuiz () {
    //hides start page
    let startscreenEl = document.getElementById('start-screen');
    startscreenEl.setAttribute('class', 'hide');

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

    // for loop to cycle through choices with button for each choice
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

// left to do
// 1. create function to manage clicking on the choice and affecting the timer and calling the feedback
// 2. function to end the quiz
// 3. function finalTime to update time and check if user ran out of time
// 4. function to save the highscore to storage
// 5. function to save score if user presses enter instead of clicking the button
// 6. create event listeners for submit and start buttons(click)
// 7. create event listeners for choices(click) and initials(enter key)