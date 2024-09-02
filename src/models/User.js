const mongoose = require('mongoose');

const { createPasswordHash } = require('../utils/passwords');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.statics.registerUser = async function (name, username, password) {
    try {
        const hashedPassword = createPasswordHash(password);

        const user = await User.create({ name, username, password: hashedPassword.hash });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
