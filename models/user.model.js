import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        maxLenght: 32,
        minLength: 5
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        trim: true,
        minLenght: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    // add timestamps to the schema for updating creating time
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;