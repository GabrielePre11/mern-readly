import { useEffect, useState } from "react";
import Container from "../layout/Container";
import { useBookStore } from "../store/bookStore";
import BookCardSkeleton from "../shared/BookCardSkeleton";
import BookCard from "../shared/BookCard";
import Filters from "../components/Filters";

import NoBooks from "../assets/no-books.svg";
import { BookOpen, Library } from "lucide-react";

/*============= Filters Interface =============*/
interface Filters {
  genre: string[];
  sort?: "newest" | "oldest" | "price-asc" | "price-desc";
}

export default function Books() {
  /*============= Zustand Book Store =============*/
  const { getAllBooks, loadingState, books, totalBooks, totalPages } =
    useBookStore();

  /*============= Loading State =============*/
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*============= Page =============*/
  const [page, setPage] = useState<number>(1);

  /*============= Filters =============*/
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    genre: [], // Initially an empty array
  });

  /*============= On Filter Change Function =============*/
  function onFilterChange(filterId: "genre" | "sort", optionId: string) {
    setPage(1);

    setSelectedFilters((prev) => {
      /*============= Genre =============*/
      if (filterId === "genre") {
        const currentGenres = prev.genre || [];
        const newGenres = currentGenres.includes(optionId)
          ? currentGenres.filter((genre) => genre !== optionId)
          : [...currentGenres, optionId];

        return { ...prev, genre: newGenres };
      }

      /*============= Sort =============*/
      if (filterId === "sort") {
        return { ...prev, sort: optionId as Filters["sort"] };
      }

      return prev;
    });
  }

  /*============= When the filters change, reset =============*/
  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    useBookStore.setState({ books: [] });
  }, [selectedFilters]);

  /*============= Load More Books Function =============*/
  const loadMoreBooks = () => {
    setIsLoading(true);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllBooks({
      page,
      limit: 6,
      genre: selectedFilters.genre,
      sort: selectedFilters.sort,
    }).finally(() => {
      setIsLoading(false);
    });
  }, [getAllBooks, page, selectedFilters]);

  return (
    <section className="pt-24 md:pt-28 lg:pt-32" aria-label="Books Section">
      <Container className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[190px_1fr] xl:grid-cols-[190px_1fr] gap-8">
        {/*============= Filters =============*/}
        <Filters filters={selectedFilters} onFilterChange={onFilterChange} />

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
              No books available! Check later or change filter!
            </p>
          </div>
        )}

        {/*============= Info & Books =============*/}
        <div className="flex flex-col">
          {/*============= Info =============*/}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="flex items-center gap-1.5 text-xl font-medium">
              {/*============= Icon =============*/}
              <span
                className="grid place-items-center p-1.5 rounded-sm bg-primary-light border border-primary-dark"
                aria-label="Page Icon"
                aria-hidden={true}
              >
                <BookOpen />
              </span>

              {/*============= Text =============*/}
              {`Page ${page} of ${totalPages}`}
            </h4>
            <h4 className="flex items-center gap-1 text-xl font-medium">
              {/*============= Icon =============*/}
              <span
                className="grid place-items-center p-1.5 rounded-sm bg-primary-light border border-primary-dark"
                aria-label="Total Books Icon"
                aria-hidden={true}
              >
                <Library />
              </span>

              {/*============= Text =============*/}
              {`Total Books: ${totalBooks}`}
            </h4>
          </div>

          {/*============= Books =============*/}
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-3">
            {loadingState || isLoading
              ? Array(6)
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
        </div>

        {/*============= Load More Button =============*/}
        <button
          className="inline-flex place-self-center col-span-full rounded-sm px-3 py-2 md:px-4 md:py-3 bg-primary-dark border border-border text-lg sm:text-xl text-primary-light w-max font-secondary mt-2 cursor-pointer transition-colors duration-200 hover:bg-primary-dark/90"
          disabled={loadingState}
          onClick={loadMoreBooks}
        >
          Load More
        </button>
      </Container>
    </section>
  );
}
