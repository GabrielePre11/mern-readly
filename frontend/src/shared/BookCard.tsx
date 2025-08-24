import { BookOpenText, Heart } from "lucide-react";
import type { Book } from "../store/bookStore";
import { Link } from "react-router-dom";
import CoverNotAvailable from "../assets/CoverNotAvailable.jpg";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import toast from "react-hot-toast";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { isAuthenticated } = useAuthStore();
  const { addToWishlist, alreadyInWishlist, removeFromWishlist } =
    useWishlistStore();

  const addBookToWishlist = (book: Book) => {
    if (!isAuthenticated) {
      toast.error("You must be authenticated to do this!");
      return;
    }

    if (!alreadyInWishlist(book._id)) {
      addToWishlist(book);
      toast.success("Book added to wishlist!");
    } else {
      removeFromWishlist(book._id);
      toast.success("Book removed from wishlist!");
    }
  };

  return (
    <article className="relative flex flex-col bg-border rounded-xs items-center gap-2 p-10 border border-primary-dark group shadow-2xl shadow-black/40 min-h-[400px]">
      <Link to={`/books/${book.slug}`}>
        {/*============= Book's Cover =============*/}
        <figure className="shadow-lg shadow-primary-dark mb-3">
          <img
            src={book.imageUrl || CoverNotAvailable}
            alt={`${book.name}'s Cover`}
            loading="lazy"
            className="max-h-[215px] object-cover object-center rounded-xs transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
          />
        </figure>
      </Link>

      {/*============= Book's Name =============*/}
      <div className="flex flex-col items-center gap-2 mt-auto">
        <h3 className="text-2xl font-semibold text-center line-clamp-1">
          {book.name}
        </h3>

        {/*============= Book's Price =============*/}
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-xl border-r-2 border-primary-dark pr-2">{`€${book.price.toFixed(
            2
          )}`}</span>

          {/*============= Book's Pages Number =============*/}
          <span className="flex items-center gap-1.5 text-xl border-r-2 border-primary-dark pr-2">
            <BookOpenText />
            {`${book.pages}`}
          </span>

          {/*============= Book's Genre =============*/}
          <span className="relative flex items-center gap-2 px-2 py-0.5 bg-primary-dark text-bg font-secondary font-semibold rounded-sm">
            {book.genre.name}
          </span>
        </div>
      </div>

      {/*============= Add To Wishlist =============*/}
      <button
        className="absolute top-4 right-3.5 grid place-items-center bg-bg p-1.5 border border-primary-dark rounded-xs cursor-pointer"
        aria-label="Add to Wishlist"
        onClick={() => addBookToWishlist(book)}
      >
        <Heart
          className={`size-7 transition-all duration-200 hover:fill-primary-dark hover:scale-110 ${
            alreadyInWishlist(book._id) && isAuthenticated
              ? "fill-primary-dark"
              : "fill-primary-light"
          }`}
        />
      </button>

      {/*============= Book's Original Language =============*/}
      <span className="flex absolute -left-2.5 top-1/2 -translate-y-1/2 items-center px-3 py-0.5 font-medium bg-bg border border-primary-dark rounded-xs -rotate-90">
        {book.language}
      </span>
    </article>
  );
}
