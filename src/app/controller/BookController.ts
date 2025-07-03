import { Request, Response } from "express";
import Book from "../models/BookModel";


//get all books => /api/books

export const getBooks = async (req: Request, res: Response) => {
   try {
      const data = await Book.find();
      res.status(200).send({
         success: true,
         message: "Books retrieved successfully",
         data
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to fetch data'
      })

   }

}

//get book by id  => /api/books/:bookId

export const getSingleBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;
      const data = await Book.findById(bookId);
      res.status(200).send({
         success: true,
         message: 'book retrieved successfully!',
         data
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to fetch the book'
      })
   }
}


// create book  =>   api/books
export const createBook = async (req: Request, res: Response) => {
   try {
      if (typeof req.body.copies === 'number') {
         req.body.availability = req.body.copies > 0
      }
      const book = new Book(req.body);

      await book.save();
      res.status(201).json({
         success: true,
         message: "Book created successfully!",
         data: book
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to create book!"
      })
   }
}


//update a book => api/books/:bookId

export const updateBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;
      const updateDoc = req.body;

      if (typeof updateDoc.copies === 'number') {
         updateDoc.availability = updateDoc.copies > 0
      }

      const doc = await Book.findByIdAndUpdate(bookId, updateDoc, { new: true })

      res.status(200).send({
         success: true,
         message: 'Book updated successfully!',
         data: doc
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to update the book'
      })
   }
}


//delete a book  => api/books/:bookId

export const deleteBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;

      await Book.findByIdAndDelete(bookId);

      res.status(200).json({
         success: true,
         message: "Book Deleted successfully!",
         data: null
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Failed to delete the book'
      })
   }
}

