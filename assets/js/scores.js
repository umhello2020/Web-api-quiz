// global DOM variables
let clearEl = document.getElementById('clear-score');

// function to display scores
function displayScores() {
    // getting stored initials or storing new initials to empty array
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // sorts list into descending order based on highest number so it resembles a normal highscore list
    scores.sort(function(a,b) {
        return b.score-a.score;
    });

    //for loop to add items to the list as they are pushed into the array
    for (let i = 0; i < scores.length; i++) {

        let liEl = document.createElement('li');
        liEl.textContent = scores[i].initials + ' : ' + scores[i].score;

        document.getElementById('scores').appendChild(liEl);
    };
    
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