require("dotenv").config();

// Define the global variables which contain app level vars
const globals = {
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    }
}

// Export the config object
module.exports = globals;