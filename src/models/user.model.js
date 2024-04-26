import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, introduce un correo electrónico válido.']
    },
    password: {
        type: String,
        required: true,
    },
}, { 
    timestamps: true
});



export default mongoose.model('User', userSchema);
