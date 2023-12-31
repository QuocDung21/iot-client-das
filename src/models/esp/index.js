const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EspSchema = new Schema({
    temp: {
        type: Number,
        required: true
    },
    humid: {
        type: Number,
        required: true
    },
    chuyendong: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Index =  mongoose.models.Esp || mongoose.model('Esp', EspSchema);
module.exports = Index;
