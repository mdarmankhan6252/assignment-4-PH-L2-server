"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be an integer'
        }
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
bookSchema.methods.checkAvailability = function () {
    if (this.copies === 0) {
        this.availability = false;
    }
    else {
        this.availability = true;
    }
};
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
