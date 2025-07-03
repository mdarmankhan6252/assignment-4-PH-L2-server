import { model, Schema } from "mongoose";


const bookSchema = new Schema<IBook>({
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
      this.availability = false
   } else {
      this.availability = true
   }
}

const Book = model<IBook>('Book', bookSchema);
export default Book;