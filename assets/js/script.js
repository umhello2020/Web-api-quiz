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

