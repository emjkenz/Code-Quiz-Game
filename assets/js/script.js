// All the questions for the quiz
var questions = [
    {
        question: "What does the acronym CSS stand for?",
        answers: ["Cascading Style Sheets", "Cascading Script Styles", "Computer Style Sheets", "Cascading System Styles"],
        correctAnswer: "Cascading Style Sheets",
    },
    {
        question: "What keyword is used in JavaScript to declare a variable?",
        answers: ["let", "var", "const", "new"],
        correctAnswer: "var",
    },
    {
        question: "What does the DOM stand for in JavaScript?",
        answers: ["Document Object Model", "Document Order Model", "Design Object Model", "Data Oriented Model"],
        correctAnswer: "Document Object Model",
    },
    {
        question: "What CSS property is used to change the color of text?",
        answers: ["font-color", "text-color", "color", "background-color"],
        correctAnswer: "color",
    },
    {
        question: "What JavaScript method is used to add an element to the end of an array?",
        answers: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
    },
    {
        question: "What CSS property is used to add spacing between HTML elements?",
        answers: ["padding", "margin", "border", "spacing"],
        correctAnswer: "margin",
    },
    {
        question: "What does the keyword 'this' refer to in JavaScript?",
        answers: ["the function itself", "the parent object", "the global object", "the object that owns the function"],
        correctAnswer: "the object that owns the function",
    },
    {
        question: "What CSS property is used to change the font size of text?",
        answers: ["text-size", "font-size", "size", "font"],
        correctAnswer: "font-size",
    },
    {
        question: "What JavaScript method is used to remove the last element from an array?",
        answers: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "pop()",
    },
    {
        question: "What CSS property is used to change the background color of an element?",
        answers: ["background", "background-color", "color", "bgcolor"],
        correctAnswer: "background-color",
    },
];


// Game Variables
var questionNumber = 0;
var score = 0;
var timer = 60;
var playername = "";
var allScores = [];

// Common elements
var mainEl = document.querySelector('main');

// Load the start screen
startScreen();

// Update the timer element
function updateTimer () {
    document.querySelector('#time').innerHTML = timer;
}

function startScreen () {
    // Update the timer back to 60
    updateTimer()

    // If end screen exists, remove it
    if (document.querySelector('.end-screen')) {
        document.querySelector('.end-screen').remove();
    }

    // If score list exists, remove it
    if (document.querySelector('.all-scores')) {
        document.querySelector('.all-scores').remove();
    }

    // If score list exists, remove it
    if (!document.querySelector('.score-list')) {
        showScoresButton();
    }

    // Create the start screen element
    var startContent = document.createElement('div');
    startContent.classList.add('start-content');
    mainEl.appendChild(startContent);

    // Add the title
    var h1 = document.createElement('h1');
    h1.innerHTML = "Quiz Game";
    startContent.appendChild(h1);

    // Add the instructional text
    var p = document.createElement('p');
    p.innerHTML = "Click the button to start the quiz";
    startContent.appendChild(p);

    // Add the button to start the game
    var startBtn = document.createElement('button');
    startBtn.id = "start";
    startBtn.innerHTML = "Start";
    startContent.appendChild(startBtn);

    // When the start button is clicked, remove the 
    // start scren, start the timer, and start the game
    document.querySelector("#start").addEventListener('click', function () {
        document.querySelector('.start-content').remove();
        timers();
        startGame();
    });

    // When "View All Scores" is clicked remove the
    // button and load the score screen
    document.querySelector('.score-list').addEventListener('click', function () {
        document.querySelector('.score-list').remove();
        showAllScores();
    });
    
}

function endScreen() {
     // If question exists, remove it
    if (document.querySelector('.questions')) {
        document.querySelector('.questions').remove();
    }
    // Update the timer
    updateTimer()

    // Create the end screen element
    var endscreendiv = document.createElement('div');
    endscreendiv.classList.add('end-screen');
    document.querySelector('main').appendChild(endscreendiv);

    // Added some text to display your score
    var yourScore = document.createElement('p');
    yourScore.classList.add('your-score')
    yourScore.textContent = "Your score is "+score;
    document.querySelector('.end-screen').appendChild(yourScore);

    // Add an input to the main element to get the name
    var input = document.createElement('input');
    input.id = "name";
    input.placeholder = "Enter your initials";
    //limit input to 3 characters
    input.maxLength = 3;
    document.querySelector('.end-screen').appendChild(input);

    // Add a button to save the name
    var saveBtn = document.createElement('button');
    saveBtn.id = "save";
    saveBtn.innerHTML = "Save";
    document.querySelector('.end-screen').appendChild(saveBtn);

    // Add an event listener to the save button
    // to save the players name
    document.querySelector("#save").addEventListener('click', function () {
        playername = document.querySelector("#name").value;
        saveGame();
    });
}

// Load the score from lcalstoreage if it exists
function loadScores() {
    var savedScores = JSON.parse(localStorage.getItem("savedGame"));
    if (savedScores !== null) {
        allScores = savedScores;
    }
    updateScore();
}

// Save your score to localstorage
function saveGame() {
    var savedGame = {
        name: playername,
        score: score,
    };
    allScores.push(savedGame);
    localStorage.setItem("savedGame", JSON.stringify(allScores));
    restart();
}

// Reset the game variables and load the Start Screen
function restart () {
    questionNumber = 0;
    score = 0;
    timer = 60;
    updateTimer()
    startScreen();
}

// Remove a second from the timer and if its 0
// end the game and stop the timer
function timers () {
    var time = setInterval(function () {
        timer--;
        document.querySelector('#time').innerHTML = timer;
        if (timer <= 0) {
            // Prevent timer from going below 0
            timer = 0;
            clearInterval(time);
            endScreen();
        }
    }, 1000);
}

// Add the scores to the "View All Scores" screen
function updateScore () {
    if (allScores.length > 0) {
        for (let i = 0; i < allScores.length; i++) {
            var scoreEl = document.createElement('li');
            scoreEl.classList.add('score');
            scoreEl.innerHTML = allScores[i].name+" - "+allScores[i].score;
            document.querySelector('.list-scores').appendChild(scoreEl);
        }
    }
}

// Check if the answer is created
function checkAnswer (answer) {
    var answerText = answer.innerHTML;
    // If the answer is correct add a point to the score
    // and reload the questions to update the question
    if (answerText === questions[questionNumber].correctAnswer) {
        questionNumber++;
        score++;
        document.querySelector('.feedback').innerHTML = "Correct!";
        // Add a short delay before moving to the next screen to show "Correct!"
        setTimeout( function(){
            startGame();
        },300)
    } else {
        // Remove 10s from the time if the answer is incorrect and
        // display "Incorrect!"
        timer = timer - 10;
        document.querySelector('.feedback').innerHTML = "Incorrect!";
    }
}

function startGame () {
    // If question exists, remove it
    if (document.querySelector('.questions')) {
        document.querySelector('.questions').remove();
    }

    // if score list exists, remove it
    if (document.querySelector('.all-scores')) {
        document.querySelector('.all-scores').remove();
    }

    // if score list exists, remove it
    if (document.querySelector('.score-list')) {
        document.querySelector('.score-list').remove();
    }

    // Check if there are questions left
    if (questionNumber < questions.length) {
        // create question
        var questionEl = document.createElement('div');
        questionEl.classList.add('questions');
        questionEl.innerHTML = questions[questionNumber].question;
        document.querySelector('main').appendChild(questionEl);

        // Add a container to add the answer buttons
        var answersEl = document.createElement('div');
        answersEl.classList.add('answers'); 
        questionEl.appendChild(answersEl);

        // Create answer buttons
        questions[questionNumber].answers.forEach(answer => {
            var answerEl = document.createElement('button');
            answerEl.classList.add('answer');
            answerEl.innerHTML = answer;
            answersEl.appendChild(answerEl);
        });

        // When the answer button is clicked check the text from the button
        // against the answer variable
        document.querySelectorAll(".answer").forEach(function(answer){
            answer.addEventListener('click', function () {
            checkAnswer(this);
            });
        });

        // Add a feedback element to show "Correct!" or "Incorrect!"
        var feedback = document.createElement('p');
        feedback.classList.add('feedback');
        questionEl.appendChild(feedback);
    }
    else {
        // Stop timer and set it to 0
        timer = 0;
        clearInterval(time); 
    }
}

function showAllScores() {
    // If question exists, remove it
    if (document.querySelector('.questions')) {
        document.querySelector('.questions').remove();
    }
    
    // If start content exists, remove it
    if (document.querySelector('.start-content')) {
        document.querySelector('.start-content').remove();
    }

    // Create an element to add scores
    var allScoresDiv = document.createElement('div');
    allScoresDiv.classList.add('all-scores');
    document.querySelector('main').appendChild(allScoresDiv);

    // Add the Score Screen title
    var h1 = document.createElement('h1');
    h1.innerHTML = "All Scores";
    allScoresDiv.appendChild(h1);

    // Create an ordered list to add the scores
    var listAllScores = document.createElement('ol');
    listAllScores.classList.add('list-scores');
    allScoresDiv.appendChild(listAllScores);

    // Add the list items to the ordered list
    loadScores()

    // Create a restart button to play the game again
    var restartBtn = document.createElement('button');
    restartBtn.id = "restart";
    restartBtn.innerHTML = "Restart";
    allScoresDiv.appendChild(restartBtn);

    // Create a clear button to reset the scores
    var clearBtn = document.createElement('button');
    clearBtn.id = "clear";
    clearBtn.innerHTML = "Clear";
    allScoresDiv.appendChild(clearBtn);

    // Go back to the Start Screen again after clicking Restart
    document.querySelector("#restart").addEventListener('click', function () {
        restart();
    });

    // Clear the local storage when the Clear button is clicked
    document.querySelector("#clear").addEventListener('click', function () {
        localStorage.clear();
        allScores = [];
        updateScore();
    });
}

// Create a button to "View All Scores"
function showScoresButton() {
    // Create button with the class of .score-list with the text of "View High Scores"
    var scoreListBtn = document.createElement('button');
    scoreListBtn.classList.add('score-list');
    scoreListBtn.innerHTML = "View High Scores";
    document.querySelector('#score').appendChild(scoreListBtn);
}