"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getSingleBook = exports.getBooks = void 0;
const BookModel_1 = __importDefault(require("../models/BookModel"));
//get all books => /api/books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield BookModel_1.default.find();
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data'
        });
    }
});
exports.getBooks = getBooks;
//get book by id  => /api/books/:bookId
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield BookModel_1.default.findById(bookId);
        res.status(200).send({
            success: true,
            message: 'book retrieved successfully!',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch the book'
        });
    }
});
exports.getSingleBook = getSingleBook;
// create book  =>   api/books
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.body.copies === 'number') {
            req.body.availability = req.body.copies > 0;
        }
        const book = new BookModel_1.default(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully!",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book!"
        });
    }
});
exports.createBook = createBook;
//update a book => api/books/:bookId
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateDoc = req.body;
        if (typeof updateDoc.copies === 'number') {
            updateDoc.availability = updateDoc.copies > 0;
        }
        const doc = yield BookModel_1.default.findByIdAndUpdate(bookId, updateDoc, { new: true });
        res.status(200).send({
            success: true,
            message: 'Book updated successfully!',
            data: doc
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update the book'
        });
    }
});
exports.updateBook = updateBook;
//delete a book  => api/books/:bookId
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield BookModel_1.default.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book Deleted successfully!",
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete the book'
        });
    }
});
exports.deleteBook = deleteBook;
