import { Router } from "express";
import { createBook, deleteBook, getBooks, getSingleBook, updateBook } from "../controller/BookController";



const bookRouter = Router();

bookRouter.get('/', getBooks);
bookRouter.get('/:bookId', getSingleBook);
bookRouter.post('/', createBook);
bookRouter.put('/:bookId', updateBook);
bookRouter.delete('/:bookId', deleteBook)


export default bookRouter;