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
    // Setup variables for operation, and x and y numbers
    const query = url.parse(req.url, true).query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    /// Output variables
    let result;
    let operation;

    switch(method) {
        case 'add':
            result = x + y;
            operation = '+';
            break;
        case 'subtract':
            result = x - y;
            operation = '-';
            break;
        case 'multiply':
            result = x * y;
            operation = '*';
            break;
        case 'divide':
            result = x / y;
            operation = '/';
            break;
        default:
            res.end('Invalid method');
            return;
    }

    res.end(`${x} ${operation} ${y} = ${result}`);

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