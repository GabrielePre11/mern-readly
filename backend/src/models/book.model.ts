import mongoose, { Schema, Types } from "mongoose";

interface BookSchemaInterface extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  author: string;
  genre: Types.ObjectId;
  pages: number;
  ISBN: string;
  language?: string;
  publishDate: Date;
}

const bookSchema: Schema = new mongoose.Schema<BookSchemaInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      default: "",
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model<BookSchemaInterface>("Book", bookSchema);
