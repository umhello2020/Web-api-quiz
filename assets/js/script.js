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
function startQuiz() {
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
    choicesEl.innerHTML = '';

    // for loop to cycle through choices with button for each choice and sets a value for it
    for (let i = 0; i < liveQuestion.choices.length; i++) {
        let choice = liveQuestion.choices[i];
        let choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choices');
        choiceBtn.setAttribute('value', choice);
        
        //puts number in front of the choice option and displays it on screen
        choiceBtn.textContent = i + 1 + '.' + choice;
        choicesEl.appendChild(choiceBtn);
    };
        
}

// function that manages clicking on choice 
function clickBtn(event) {
    // create button element 
    let buttonEl = event.target;

    // conditional statements for the buttons
    if (buttonEl.value !== questions[liveQuestionIndex].answer) {
       // first subtract from time
       time -= 10;

       // time cannot be negative since game ends at zero
       if (time < 0) {
        time = 0;
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
        rightWrongEl.setAttribute('class', 'right-wrong hide');
    }, 750);

    // move onto next question
    liveQuestionIndex++;

    // conditional statement if time ran out or end of quiz
    if (time == 0 || liveQuestionIndex == questions.length) {
        endQuiz();
    } else {
        startQuestions();
    };
}

// function to end the quiz
function endQuiz() {
    // hide question page and display end page
    questionsEl.setAttribute('class', 'hide');

    let endPageEl = document.getElementById('end-page');
    endPageEl.removeAttribute('class');

    // clear countdown on page
    clearInterval(countdownId); 

    // display final score as remaining time
    finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
}

// function to ensure time counts down and check for 0
function finalTime() {
    // update time
    time--;
    countdownEl.textContent = time;

    // conditional statement to check if time has run out
    if (time <= 0) {
        endQuiz();
    };
}

// function to store highscores
function storeHigh() {
    // assign a value for initial input (trim to remove excess space around user input value)
    let initials = initialsEl.value.trim();

    // conditional statement to save initials to storage 
    if (initials !== null) {
        // getting stored initials or storing new initials to empty array
        let scores = JSON.parse(window.localStorage.getItem('scores')) || [];

        // new object to contain user's new scores (their score is equal to remaining time and their initials value is equal to their initial input)
        let newScores = {
            score : time,
            initials : initials,
        }

        // pushing to local storing
        scores.push(newScores);
        window.localStorage.setItem('scores', JSON.stringify(scores));

        // changes window to scores page
        window.location.href = 'scores.html';

    };

}

// if user presses enter to save intials it will still save
function enterKey(event) {
    if (event.key === 'Enter') {
        storeHigh();
    };
};

// button to submit initials
submitBtnEl.addEventListener('click', storeHigh);

// button to start quiz
startBtnEl.addEventListener('click', startQuiz);

// button to select choice
choicesEl.addEventListener('click', clickBtn);

// key event for enter button
initialsEl.addEventListener('keyup', enterKey);