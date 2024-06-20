/*********************************
 * COMP2068 - Javascript Frameworks
 * Jacob Chotenovsky
 * 200545482
 * June 20th 2024
 * 
 * Create a basic calculator in node js with a connect server
*/

const connect = require('connect');
const url = require('url');

function calculate(req, res) {
}

const app = connect();

app.use((req, res) => {
    if (req.url.startsWith('/lab3')) {
        calculate(req, res);
    } else {
        res.end('Invalid URL');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});