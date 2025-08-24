import { useEffect } from "react";
import Container from "../layout/Container";
import { useBookStore } from "../store/bookStore";
import { Link } from "react-router-dom";
import BookCard from "../shared/BookCard";
import BookCardSkeleton from "../shared/BookCardSkeleton";

export default function FeaturedBooks() {
  const { featuredBooks, getFeaturedBooks, loadingState } = useBookStore();

  useEffect(() => {
    getFeaturedBooks({ page: 1, limit: 8 });
  }, [getFeaturedBooks]);

  return (
    <section className="pt-20 lg:pt-24" aria-label="Popular Books Section">
      <Container className="grid">
        {/*============= Title =============*/}
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Featured Books
        </h2>

        {/*============= Featured Books =============*/}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {loadingState
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <BookCardSkeleton />
                  </li>
                ))
            : featuredBooks?.map((book) => (
                <li key={book._id}>
                  <BookCard book={book} />
                </li>
              ))}
        </ul>

        {/*============= Explore More Button =============*/}
        <Link to={"/books"} className="place-self-center">
          <button className="inline-flex items-center rounded-sm px-3 py-2 md:px-4 md:py-3 bg-primary-dark border border-border text-lg sm:text-xl text-primary-light w-max font-secondary mt-12 cursor-pointer transition-colors duration-200 hover:bg-primary-dark/90">
            Explore More
          </button>
        </Link>
      </Container>
    </section>
  );
}
