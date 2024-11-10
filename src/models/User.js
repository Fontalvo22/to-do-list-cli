const mongoose = require('mongoose');
const logger = require('pino')();
const jwt = require('jsonwebtoken');

const { createPasswordHash, comparePassword } = require('../utils/passwords');

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

userSchema.pre('findOne', function (next) {
    setTimeout(next, 1000); // 1000 ms de retraso
});

userSchema.statics.registerUser = async function (name, username, password) {
    try {
        const hashedPassword = createPasswordHash(password);

        const user = await User.create({ name, username, password: hashedPassword.hash });

        return user;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.login = async function (username, password) {
    try {
        const user = await User.findOne({ username });
        const isValidPassword = await comparePassword(password, user.password);

        if (isValidPassword) {
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            const refreshToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            user.password = undefined;
            return { logged: isValidPassword, token: token ? token : null, refreshToken: refreshToken, user: user };
        } else {
            return { logged: isValidPassword, token: null, refreshToken: null, user: null };
        }
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
