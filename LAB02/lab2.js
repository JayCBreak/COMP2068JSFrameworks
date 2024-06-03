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

// Define a schema
var schema = {
    properties: {
        userSelection: {
            description: 'Choose ROCK, PAPER, or SCISSORS',
            pattern: /^(ROCK|PAPER|SCISSORS)$/i,
            message: 'You have to choose, ROCK, PAPER, or SCISSORS',
            required: true,
            before: function(value) { return value.toUpperCase(); }
        }
    }
};

// Start the prompt
prompt.start();

// Get the user input
prompt.get(schema, function(err, result) {
    // Deal with errors
    if(err) {
        return onError(err);
    } else {
        // Run the game
        console.log("The user chose: " + result.userSelection);
        var seed = Math.random();
        
        // Make the human selection
        if(seed < 0.34) {
            var computerSelection = 'PAPER';
        } else if(seed <= 0.67) {
            var computerSelection = 'SCISSORS';
        } else {
            var computerSelection = 'ROCK';
        }
        console.log("The computer chose: " + computerSelection);
    }
})

function onError(err) {
    console.log(err);
    return 1;
}