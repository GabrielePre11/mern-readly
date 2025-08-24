import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import mongoose from "mongoose";
import axios from "axios";
import slugify from "slugify";
import { Genre } from "../models/genre.model";
import { Book } from "../models/book.model";

const MongoDBURL = process.env.MONGODB_URI;

async function connectDB() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  const uri = MongoDBURL;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");
}

const genresList = [
  { name: "Fantasy", subjectSlug: "fantasy" },
  { name: "Science Fiction", subjectSlug: "science_fiction" },
  { name: "Horror", subjectSlug: "horror" },
  { name: "Thriller", subjectSlug: "thriller" },
  { name: "Romance", subjectSlug: "romance" },
  { name: "Mystery", subjectSlug: "mystery" },
  { name: "Historical Fiction", subjectSlug: "historical_fiction" },
  { name: "Adventure", subjectSlug: "adventure" },
  { name: "Biography", subjectSlug: "biography" },
  { name: "Young Adult", subjectSlug: "young_adult" },
  { name: "Poetry", subjectSlug: "poetry" },
  { name: "Drama", subjectSlug: "drama" },
  { name: "Children", subjectSlug: "children" },
  { name: "Comics", subjectSlug: "comics" },
  { name: "Philosophy", subjectSlug: "philosophy" },
];

async function seedGenres() {
  for (const genre of genresList) {
    const slug = slugify(genre.name, { lower: true, strict: true });

    await Genre.findOneAndUpdate(
      { slug },
      {
        name: genre.name,
        slug,
        subjectSlug: genre.subjectSlug,
      },
      { upsert: true, new: true }
    );
  }
  console.log("✅ Genres (with images) seeded!");
}

async function seedBooksByGenre() {
  const genreDocs = await Genre.find();

  for (const genre of genreDocs) {
    const subjectSlug = genre.slug;
    console.log(`📚 Seeding books for genre: ${genre.name}...`);

    try {
      const res = await axios.get(
        `https://openlibrary.org/subjects/${subjectSlug}.json`,
        {
          params: { limit: 50 },
          headers: {
            "User-Agent": "ReadlyBookApp/1.0 (gabryprestanoitaly@gmail.com)",
          },
        }
      );

      const works = res.data.works;

      for (const work of works) {
        if (!work.title || !work.authors?.length || !work.cover_id) continue;

        const bookData = {
          name: work.title,
          slug: slugify(work.title, { lower: true, strict: true }),
          description:
            work.subject?.slice(0, 5).join(", ") || "No description.",
          price: Math.floor(Math.random() * 20) + 5,
          imageUrl: `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
          author: work.authors[0]?.name || "Unknown",
          genre: genre._id,
          pages: Math.floor(Math.random() * 300) + 100,
          ISBN:
            work.cover_edition_key ||
            `OL-${Math.floor(Math.random() * 1000000)}`,
          language: "English",
          publishDate: work.first_publish_year
            ? new Date(work.first_publish_year, 0, 1)
            : new Date(),
        };

        const existing = await Book.findOne({ ISBN: bookData.ISBN });

        if (!existing) {
          await Book.create(bookData);
        } else {
          await Book.updateOne({ _id: existing._id }, bookData);
        }
      }

      console.log(`✅ Books seeded for genre: ${genre.name}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          `❌ Failed to seed books for ${genre.name}:`,
          err.message
        );
      }
    }
  }
}

async function main() {
  try {
    await connectDB();

    await Book.deleteMany();

    await seedGenres();

    await seedBooksByGenre();

    await mongoose.disconnect();
    console.log("✅ Seed complete!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  }
}

main();
