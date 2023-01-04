// global DOM variables
let clearEl = document.getElementById('clear-score');

// function to display scores
function displayScores() {
    // getting stored initials or storing new initials to empty array
    let scores = JSON.parse(localStorage.getItem('scores')) || [];


}

// function for clearing of scores
function clearScores() {
    window.localStorage.removeItem('scores');
    // reloads the URL to show cleared board
    window.location.reload();
}

// button to clear scores
clearEl.onclick = clearScores;

// call first function to page
displayScores();