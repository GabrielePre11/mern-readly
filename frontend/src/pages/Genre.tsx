import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import { useGenreStore } from "../store/genreStore";
import { useEffect, useState } from "react";

import NoBooks from "../assets/no-books.svg";
import NoCover from "../assets/CoverNotAvailable.jpg";
import BookCard from "../shared/BookCard";
import BookCardSkeleton from "../shared/BookCardSkeleton";

import adventureImage from "../assets/genres/adventure.jpg";
import biographyImage from "../assets/genres/biography.jpg";
import childrenImage from "../assets/genres/children.avif";
import comicsImage from "../assets/genres/comics.jpg";
import dramaImage from "../assets/genres/drama.jpg";
import fantasyImage from "../assets/genres/fantasy.webp";
import historicalFictionImage from "../assets/genres/historical-fiction.jpg";
import horrorImage from "../assets/genres/horror.jpg";
import mysteryImage from "../assets/genres/mystery.jpg";
import philosophyImage from "../assets/genres/philosophy.jpg";
import poetryImage from "../assets/genres/poetry.jpg";
import romanceImage from "../assets/genres/romance.jpg";
import sciFiImage from "../assets/genres/sci-fi.jpg";
import thrillerImage from "../assets/genres/thriller.jpg";
import youngAdultImage from "../assets/genres/young-adult.webp";

export const genreImageMap: Record<string, string> = {
  adventure: adventureImage,
  biography: biographyImage,
  children: childrenImage,
  comics: comicsImage,
  drama: dramaImage,
  fantasy: fantasyImage,
  "historical-fiction": historicalFictionImage,
  horror: horrorImage,
  mystery: mysteryImage,
  philosophy: philosophyImage,
  poetry: poetryImage,
  romance: romanceImage,
  "science-fiction": sciFiImage,
  thriller: thrillerImage,
  "young-adult": youngAdultImage,
};

export default function Genre() {
  const { slug } = useParams<{ slug: string }>();

  const { genreBooks, getSingleGenre, loadingState, selectedGenre } =
    useGenreStore();

  const [limit, setLimit] = useState<number>(8);

  const loadMoreBooks = () => {
    useGenreStore.setState({ loadingState: true });
    setLimit((prev) => prev + limit);
  };

  useEffect(() => {
    if (slug) getSingleGenre(slug, limit);
  }, [slug, getSingleGenre, limit]);

  return (
    <section className="pt-24" aria-label="Genre Section">
      <Container className="grid">
        {/*============= Selected Genre =============*/}
        <div className="relative h-[400px] overflow-hidden [clip-path: ellipse(100% 80% at 50% 100%)] rounded-lg shadow-md shadow-black/40">
          {/*=========== Image Background ===========*/}
          <img
            src={slug && genreImageMap[slug] ? genreImageMap[slug] : NoCover}
            alt={`${selectedGenre?.name || "Unknown"}'s Image Background`}
            width={1000}
            height={1000}
            className="w-full h-full object-cover lg:object-top brightness-60"
          />

          {/*=========== Title ===========*/}
          <h1 className="absolute left-3 bottom-12 text-4xl text-primary-light md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl drop-shadow-primary">
            {selectedGenre?.name}
          </h1>
        </div>

        {/*============= No books found =============*/}
        {!loadingState && genreBooks?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-3 lg:py-0">
            {/*============= No books picture =============*/}
            <img
              src={NoBooks}
              alt="No books were found."
              className="w-full max-w-[320px] lg:max-w-[400px] place-self-center"
            />

            {/*============= No books alert =============*/}
            <p className="text-balance text-2xl md:text-3xl text-primary-dark text-center">
              No books available! Check later or change filter!
            </p>
          </div>
        )}

        {/*============= Books =============*/}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {loadingState
            ? Array(genreBooks?.length)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <BookCardSkeleton />
                  </li>
                ))
            : genreBooks?.map((book) => (
                <li key={book._id}>
                  <BookCard book={book} />
                </li>
              ))}
        </ul>

        <button
          className="inline-flex mt-8 place-self-center col-span-full rounded-sm px-3 py-2 md:px-4 md:py-3 bg-primary-dark border border-border text-lg sm:text-xl text-primary-light w-max font-secondary cursor-pointer transition-colors duration-200 hover:bg-primary-dark/90"
          disabled={loadingState}
          onClick={loadMoreBooks}
        >
          Load More
        </button>
      </Container>
    </section>
  );
}
