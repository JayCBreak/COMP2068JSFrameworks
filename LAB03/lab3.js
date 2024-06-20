/*********************************
 * COMP2068 - Javascript Frameworks
 * Jacob Chotenovsky
 * 200545482
 * June 20th 2024
 * 
 * Create a basic calculator in node js with a connect server
*/
// Imports
const connect = require('connect');
const url = require('url');

// Function to do the calculation 
function calc(req, res) {
}

// Setup web server
const app = connect();
// Create the valid page routes
app.use((req, res) => {
    if (req.url.startsWith('/lab3')) {
        calc(req, res);
    } else {
        res.end('Invalid URL');
    }
});

// Setup the port to listen on
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});