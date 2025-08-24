// models/genre.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface GenreSchemaInterface extends Document {
  name: string;
  slug: string;
  subjectSlug: string;
  description?: string;
  image: string;
}

const genreSchema = new Schema<GenreSchemaInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    subjectSlug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Genre = mongoose.model<GenreSchemaInterface>("Genre", genreSchema);
