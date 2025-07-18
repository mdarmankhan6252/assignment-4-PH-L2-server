"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookController_1 = require("../controller/BookController");
const bookRouter = (0, express_1.Router)();
bookRouter.get('/', BookController_1.getBooks);
bookRouter.get('/:bookId', BookController_1.getSingleBook);
bookRouter.post('/', BookController_1.createBook);
bookRouter.put('/:bookId', BookController_1.updateBook);
bookRouter.delete('/:bookId', BookController_1.deleteBook);
exports.default = bookRouter;
