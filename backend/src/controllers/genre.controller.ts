import { Request, Response } from "express";
import { Genre } from "../models/genre.model";
import slugify from "slugify";
import { Book } from "../models/book.model";

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({ success: true, genres });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch genres" });
  }
};

export const getSingleGenre = async (
  req: Request<{ slug: string }, {}, {}>,
  res: Response
) => {
  const { slug } = req.params;

  try {
    const genre = await Genre.findOne({ slug });

    //========= Check if the genre is available or if it's valid =========//
    if (!genre) {
      return res
        .status(404)
        .json({ success: false, message: "No genre found" });
    }

    const books = await Book.find({ genre: genre._id }).populate(
      "genre",
      "name slug"
    );

    res.status(200).json({ success: true, genre, books });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while getting genre:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

export const createGenre = async (
  req: Request<{}, {}, { name: string; description: string }>,
  res: Response
) => {
  const { name, description } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  const slug = slugify(name, { lower: true, strict: true });

  try {
    const existing = await Genre.findOne({ slug });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Genre already exists" });
    }

    const genre = new Genre({ name, slug, description });
    await genre.save();

    res.status(201).json({ success: true, genre });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create genre" });
  }
};
