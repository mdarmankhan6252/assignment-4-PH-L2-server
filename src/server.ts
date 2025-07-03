import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import bookRouter from './app/routes/bookRoute';
import connectDB from './app/config/db';
import borrowRouter from './app/routes/borrowRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
   origin: 'https://assignment-4-client-one.vercel.app'
}))


// main route
app.get('/', (req: Request, res: Response) =>{
   res.send("Server Running.")
})


//application routes

app.use('/api/books', bookRouter)
app.use('/api/borrow', borrowRouter)


app.listen(port, () =>{
   console.log("Server running on port: ", port);
})