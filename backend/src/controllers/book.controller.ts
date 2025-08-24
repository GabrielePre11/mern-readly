import { Request, Response } from "express";
import { Book } from "../models/book.model";
import mongoose, { FilterQuery } from "mongoose";
import slugify from "slugify";
import { Genre } from "../models/genre.model";

interface BooksQuery {
  genre: string;
  sort: "newest" | "oldest" | "price-asc" | "price-desc";
  page: string;
  limit: string;
  search: string;
}

//========= All the properties are not required =========//
type PartialBooksQuery = Partial<BooksQuery>;

interface BookRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  author: string;
  genre: string;
  pages: number;
  ISBN: string;
  language?: string;
  publishDate: string;
}

export const getAllBooks = async (
  req: Request<{}, {}, {}, PartialBooksQuery>,
  res: Response
) => {
  try {
    const { genre, sort, page, limit, search } = req.query;

    //========= The dynamic query to filter the books, initially an empty object =========//
    const dynamicQuery: FilterQuery<typeof Book> = {};

    //========= If filters are available, add them to the dynamicQuery object =========//
    if (genre) {
      if (Array.isArray(genre)) {
        dynamicQuery.genre = { $in: genre }; // More than one genre
      } else {
        dynamicQuery.genre = genre; // Just one genre
      }
    }

    //========= User Search =========//
    if (search) {
      dynamicQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    //========= Pagination & Skip =========//

    // Since the numbers come as strings in the query, convert them into a Number.
    const pageNum = Number(page) || 1; // By default it's 1.
    const booksLimit = Number(limit) || 10; // By default it's 10.
    const skip = (pageNum - 1) * booksLimit; // ex. (1 - 1) = 1 * 10 = 10 (0-9 books)

    //========= Sort the books =========//
    const sortOption: Record<string, 1 | -1> =
      sort === "newest"
        ? { createdAt: -1 }
        : sort === "oldest"
        ? { createdAt: 1 }
        : sort === "price-asc"
        ? { price: 1 }
        : sort === "price-desc"
        ? { price: -1 }
        : {};

    const books = await Book.find(dynamicQuery)
      .populate("genre")
      .sort(sortOption)
      .skip(skip)
      .limit(booksLimit);

    //========= totalBooks (all the books in the DB) and totalPages =========//
    const totalBooks = await Book.countDocuments(dynamicQuery);
    const totalPages = Math.ceil(totalBooks / booksLimit);

    res.status(200).json({
      success: true,
      booksCount: books.length,
      totalBooks,
      page: pageNum,
      limit: booksLimit,
      totalPages,
      books,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while getting books:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

export const getSingleBook = async (
  req: Request<{ slug: string }, {}, {}>,
  res: Response
) => {
  const { slug } = req.params;

  try {
    const book = await Book.findOne({ slug }).populate("genre", "name slug");

    //========= Check if the book is available or if it's valid =========//
    if (!book) {
      return res.status(404).json({ success: false, message: "No book found" });
    }

    res.status(200).json({ success: true, book });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while getting book:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

export const createBook = async (
  req: Request<{}, {}, BookRequest>,
  res: Response
) => {
  const {
    name,
    price,
    description,
    imageUrl,
    author,
    genre,
    pages,
    ISBN,
    language,
    publishDate,
  } = req.body;

  try {
    //========= Check all the fields (language is not required) =========//
    if (
      !name ||
      !price ||
      !description ||
      !imageUrl ||
      !author ||
      !genre ||
      !pages ||
      !ISBN ||
      !publishDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields!",
      });
    }

    //========= Create the book's slug with Slugify =========//
    const bookSlug = slugify(name, { lower: true, strict: true });

    //========= Verify if the book already exists by checking the slug =========//
    const bookAlreadyExists = await Book.findOne({ slug: bookSlug });

    if (bookAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Book already exists!" });
    }

    // Find the Genre (we need the ID since it's a string)
    const bookGenre = await Genre.findOne({ name: genre });

    if (!bookGenre) {
      return res.status(400).json({
        success: false,
        message: "Genre not found!",
      });
    }

    if (isNaN(price) || isNaN(pages)) {
      return res.status(400).json({
        success: false,
        message: "The price and pages must be valid numbers!",
      });
    }

    const parsedPages = Number(pages);
    const parsedISBN = String(ISBN);

    //========= Create the new book =========//
    const book = new Book({
      name,
      slug: bookSlug,
      price,
      description,
      imageUrl,
      author,
      genre: bookGenre._id,
      pages: parsedPages,
      ISBN: parsedISBN,
      language,
      publishDate,
    });

    //========= Save the book in the database =========//
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book created successfully!",
      book,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while creating new user:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const updateBook = async (
  req: Request<{ id: string }, {}, Partial<BookRequest>>,
  res: Response
) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    //========= Check if the ID is valid =========//
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    if (updateData.genre) {
      const bookGenre = await Genre.findOne({ name: updateData.genre });
      if (!bookGenre) {
        return res
          .status(400)
          .json({ success: false, message: "Genre not found!" });
      }

      // any: because it's not a string, and I can't use MongoDb Types.ObjectID.
      updateData.genre = bookGenre._id as any;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while updating book:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const deleteBook = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  try {
    //========= Check if the ID is valid =========//
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const bookToDelete = await Book.findByIdAndDelete(id);

    if (!bookToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully!" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while deleting book:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
