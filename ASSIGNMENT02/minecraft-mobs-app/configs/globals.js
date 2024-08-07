require("dotenv").config();

// Define the global variables which contain app level vars
const globals = {
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
    Github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: process.env.GITHUB_CALLBACK_URL
    }
}

// Export the config object
module.exports = globals;