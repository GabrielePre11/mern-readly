import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import { useBookStore } from "../store/bookStore";
import { useEffect } from "react";

import NoBooks from "../assets/no-books.svg";
import { BookOpenText, ScanBarcode } from "lucide-react";

import NoCover from "../assets/CoverNotAvailable.jpg";
import { useGenreStore } from "../store/genreStore";
import BookCardSkeleton from "../shared/BookCardSkeleton";
import BookCard from "../shared/BookCard";

export default function Book() {
  const { slug } = useParams<{ slug: string }>();

  const { getBook, book, loadingState } = useBookStore();
  const { genreBooks, getSingleGenre } = useGenreStore();

  useEffect(() => {
    if (slug) getBook(slug);
  }, [slug, getBook]);

  useEffect(() => {
    if (book?.genre.slug) getSingleGenre(book?.genre.slug, 8);
  }, [book?.genre.slug, getSingleGenre]);

  return (
    <section className="pt-24 md:pt-28 lg:pt-32" aria-label="Book Section">
      <Container className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/*============= Book Cover =============*/}
        <figure className="max-w-[300px] md:max-w-[315px] lg:max-w-[330px] place-self-center border border-primary-dark p-10 bg-primary-light rounded-xs overflow-hidden group">
          <img
            src={book?.imageUrl || NoCover}
            alt={`${book?.name}'s Cover`}
            className="w-full object-center object-cover shadow-2xl shadow-black/90 transition-all duration-300 group-hover:brightness-105 group-hover:scale-105"
          />
        </figure>

        {/*============= No books found =============*/}
        {!loadingState && !book && (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-3 lg:py-0">
            {/*============= No books picture =============*/}
            <img
              src={NoBooks}
              alt="No books were found."
              className="w-full max-w-[320px] lg:max-w-[400px] place-self-center"
            />

            {/*============= No books alert =============*/}
            <p className="text-balance text-2xl md:text-3xl text-primary-dark text-center">
              No book available! Try to check later!
            </p>
          </div>
        )}

        {/*============= Book Info =============*/}
        <div className="flex flex-col gap-1.5 md:gap-3 mt-5 md:mt-0 place-self-center">
          {/*============= Book's Name =============*/}
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            {book?.name}
          </h3>

          {/*============= Book's Author =============*/}
          <h5 className="text-lg md:text-xl lg:text-2xl font-medium text-text">
            {book?.author}
          </h5>

          {/*============= Publish Date =============*/}
          <p className="flex items-center gap-1 text-lg md:text-xl lg:text-2xl font-medium">
            Published in
            <span className="font-bold">
              {book?.publishDate
                ? new Date(book.publishDate).toISOString().split("T")[0]
                : "Data sconosciuta"}
            </span>
          </p>

          {/*============= Book's Description =============*/}
          <p className="text-muted max-w-[450px] lg:text-lg">
            {book?.description}
          </p>

          {/*============= Book's Price =============*/}
          <span className="text-xl lg:text-2xl font-medium">{`€${book?.price.toFixed(
            2
          )}`}</span>

          {/*============= Book's Other Infos =============*/}
          <div className="mt-2 border-t-2 border-primary-dark max-w-[480px]">
            <div className="flex items-center gap-3.5 mt-3">
              <p className="flex items-center gap-1.5 text-lg md:text-xl lg:text-2xl">
                <ScanBarcode />
                <span className="underline font-medium">{book?.ISBN}</span>
              </p>

              <p className="flex items-center gap-1.5 text-lg lg:text-2xl">
                <BookOpenText />
                <span className="font-medium">{book?.pages}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col mt-20">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold">
          You might also like
        </h2>
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
            : genreBooks?.slice(0, 8).map((book) => (
                <li key={book._id}>
                  <BookCard book={book} />
                </li>
              ))}
        </ul>
      </Container>
    </section>
  );
}
