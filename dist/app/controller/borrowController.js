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
exports.getBorrowBooksSummary = exports.borrowBook = void 0;
const borrowSchema_1 = __importDefault(require("../models/borrowSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const BookModel_1 = __importDefault(require("../models/BookModel"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = new borrowSchema_1.default(req.body);
        if (!mongoose_1.default.Types.ObjectId.isValid(book)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID formate"
            });
        }
        const bookDoc = yield BookModel_1.default.findById(book);
        if (!bookDoc) {
            res.status(404).json({
                success: false,
                message: "Book Not Found!"
            });
        }
        if (bookDoc && (bookDoc === null || bookDoc === void 0 ? void 0 : bookDoc.copies) < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available'
            });
        }
        if (bookDoc) {
            bookDoc.copies = bookDoc.copies - quantity;
        }
        bookDoc === null || bookDoc === void 0 ? void 0 : bookDoc.checkAvailability();
        yield (bookDoc === null || bookDoc === void 0 ? void 0 : bookDoc.save());
        const borrow = yield borrowSchema_1.default.create({
            book,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully!",
            data: borrow
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to borrow a book"
        });
    }
});
exports.borrowBook = borrowBook;
//  borrow a book -> /api/borrow
const getBorrowBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowSchema_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrow summary"
        });
    }
});
exports.getBorrowBooksSummary = getBorrowBooksSummary;
