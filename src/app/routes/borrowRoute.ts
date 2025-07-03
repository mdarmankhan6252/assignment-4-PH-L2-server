import { Router } from "express";
import { borrowBook, getBorrowBooksSummary } from "../controller/borrowController";



const borrowRouter = Router();

borrowRouter.post('/', borrowBook)
borrowRouter.get('/', getBorrowBooksSummary)

export default borrowRouter;