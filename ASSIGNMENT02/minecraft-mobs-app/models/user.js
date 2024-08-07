// Model for the user extended with a plugin to add pass encryption, validation, and user serialization
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    oauthId: {type: String},
    oauthProvider: {type: String},
    created: {type: Date }
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);