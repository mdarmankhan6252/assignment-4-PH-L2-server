import { Request, Response } from "express";
import Borrow from "../models/borrowSchema";
import mongoose from "mongoose";
import Book from "../models/BookModel";


export const borrowBook = async (req: Request, res: Response) => {

   try {
      const { book, quantity, dueDate } = new Borrow(req.body);

      if (!mongoose.Types.ObjectId.isValid(book)) {
         res.status(400).json({
            success: false,
            message: "Invalid book ID formate"
         })
      }

      const bookDoc = await Book.findById(book);
      console.log(bookDoc);

      if (!bookDoc) {
         res.status(404).json({
            success: false,
            message: "Book Not Found!"
         })
      }

      if (bookDoc && bookDoc?.copies < quantity) {
         res.status(400).json({
            success: false,
            message: 'Not enough copies available'
         })
      }

      if (bookDoc) {
         bookDoc.copies = bookDoc.copies - quantity
      }

      bookDoc?.checkAvailability();

      await bookDoc?.save();

      const borrow = await Borrow.create({
         book,
         quantity,
         dueDate
      })

      res.status(201).json({
         success: true,
         message: "Book borrowed successfully!",
         data: borrow
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to borrow a book"
      })
   }
}


//  borrow a book -> /api/borrow

export const getBorrowBooksSummary = async (req: Request, res: Response) => {
   try {
      const summary = await Borrow.aggregate([
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
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to fetch borrow summary"
      })
   }
}

