/*********************************
 * COMP2068 - Javascript Frameworks
 * Jacob Chotenovsky
 * 200545482
 * June 3rd 2024
 * 
 * Create a program that lets a user play rock paper scissors with an AI
*/

// Importing the prompt package that was installed
const prompt = require('prompt');

// Define a schema for user selection
var selectionSchema = {
    properties: {
        userSelection: {
            description: 'Choose ROCK, PAPER, or SCISSORS',
            pattern: /^(ROCK|PAPER|SCISSORS)$/i,
            message: 'You have to choose ROCK, PAPER, or SCISSORS',
            required: true,
            before: function(value) { return value.toUpperCase(); }
        }
    }
};

// Define a schema to continue
var continueSchema = {
    properties: {
        continue: {
            description: 'Do you want to play again? (YES/NO)',
            pattern: /^(YES|NO)$/i,
            message: 'You have to choose YES or NO',
            required: true,
            before: function(value) { return value.toUpperCase(); }
        }
    }
};

// Function to play the game
function playGame() {
    // Start the prompt
    prompt.start();

    // Get the user input
    prompt.get(selectionSchema, function(err, result) {
        // Deal with errors
        if (err) {
            return onError(err);
        } else {
            // Run the game
            console.log("The user chose: " + result.userSelection);
            var seed = Math.random();

            // Make the computer selection
            var computerSelection;
            if (seed < 0.34) {
                computerSelection = 'PAPER';
            } else if (seed <= 0.67) {
                computerSelection = 'SCISSORS';
            } else {
                computerSelection = 'ROCK';
            }
            console.log("The computer chose: " + computerSelection);

            // Compare the selections strictly with triple =
            var verdict;
            if (result.userSelection === computerSelection) {
                verdict = "It's a tie";
            } else if ((result.userSelection === 'ROCK' && computerSelection === 'SCISSORS') || 
                       (result.userSelection === 'PAPER' && computerSelection === 'ROCK') || 
                       (result.userSelection === 'SCISSORS' && computerSelection === 'PAPER')) {
                verdict = "User Wins";
            } else {
                verdict = "Computer Wins";
            }

            // Output the winner
            console.log(verdict);

            // Ask if the user wants to play again
            prompt.get(continueSchema, function(err, result) {
                if (err) {
                    return onError(err);
                } else if (result.continue === 'YES') {
                    playGame(); // Recursive call to play another round
                } else {
                    console.log("Thanks for playing!");
                }
            });
        }
    });
}

// Function to handle errors
function onError(err) {
    console.log(err);
    return 1;
}

// Start the first game
playGame();
