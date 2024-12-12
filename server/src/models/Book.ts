import { Schema, type Document } from 'mongoose';

export interface BookDocument extends Document {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
  // ratings: { rating: number; user: string }[];
  // averageRating: number;
  // totalRatings: number;
  ratings: { rating: number; user: string }[];
  averageRating: number;
  totalRatings: number;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema<BookDocument>({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  ratings: [
    {
      rating: { type: Number, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true, 
  },
});

export default bookSchema;
