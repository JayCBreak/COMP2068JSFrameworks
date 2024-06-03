/*********************************
 * COMP2068 - Javascript Frameworks
 * Jacob Chotenovsky
 * 200545482
 * June 3rd 2024
 * 
 * Create a program that lets a user play rock paper scissors with an AI
*/

// Importing the prompt package that was installed
const prompt = require('prompt')

// Define a schema
const schema = {
    properties: {
        userPrompt: {
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
    if(err) {
        return onError(err);
    }
})

function onError(err) {
    console.log(err);
    return 1;
}