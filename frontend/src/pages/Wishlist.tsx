import BookCard from "../shared/BookCard";
import Container from "../layout/Container";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";

import NoBooks from "../assets/no-books.svg";

export default function Wishlist() {
  const { user } = useAuthStore();
  const { wishlist } = useWishlistStore();

  return (
    <section className="pt-24 md:pt-28 lg:pt-32" aria-label="Wishlist">
      <Container>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
          Welcome back, <em className="font-medium">{user?.name}</em>
        </h2>

        {/*============= No books found =============*/}
        {wishlist?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-10 lg:py-0">
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
          {wishlist?.map((book) => (
            <li key={book._id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
