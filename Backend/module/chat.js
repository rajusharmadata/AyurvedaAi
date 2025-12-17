import mongoose from 'mongoose';
import Message from './message.js';

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Chat', chatSchema);