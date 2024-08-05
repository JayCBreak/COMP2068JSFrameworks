// Import mongoose for MongoDB connection and schema creation
const mongoose = require('mongoose');

// Create a schema for the mob model
const mobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: false },
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    itemHeld: { type: String, required: false },
    itemsDropped: { type: String, required: false },
    description: { type: String, required: true },
    gameVersion: { type: String, required: true }
});


// Export the mob model
module.exports = mongoose.model('Mob', mobSchema);