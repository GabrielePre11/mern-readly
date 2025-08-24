import { useSearchParams } from "react-router-dom";
import Container from "../layout/Container";
import { useBookStore } from "../store/bookStore";
import { useEffect } from "react";

import NoBooks from "../assets/no-books.svg";
import BookCard from "../shared/BookCard";
import BookCardSkeleton from "../shared/BookCardSkeleton";

export default function Search() {
  const [params] = useSearchParams();
  const userQuery = params.get("q") || "";

  const { searchBook, books, loadingState } = useBookStore();

  useEffect(() => {
    if (userQuery) searchBook(userQuery);
  }, [searchBook, userQuery]);

  return (
    <section className="pt-24 md:pt-28 lg:pt-32" aria-label="Search Section">
      <Container>
        {/*============= Title =============*/}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium ">
          Results for: <em className="font-semibold text-3xl">{userQuery}</em>
        </h2>

        {/*============= No books found =============*/}
        {!loadingState && books?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-3 lg:py-0">
            {/*============= No books picture =============*/}
            <img
              src={NoBooks}
              alt="No books were found."
              className="w-full max-w-[320px] lg:max-w-[400px] place-self-center"
            />

            {/*============= No books alert =============*/}
            <p className="text-balance text-2xl md:text-3xl text-primary-dark text-center">
              No books available! Try to search something else.
            </p>
          </div>
        )}

        {/*============= Books =============*/}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {loadingState
            ? Array(books?.length)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <BookCardSkeleton />
                  </li>
                ))
            : books?.map((book) => (
                <li key={book._id}>
                  <BookCard book={book} />
                </li>
              ))}
        </ul>
      </Container>
    </section>
  );
}
