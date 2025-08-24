import { BookOpenText, Heart } from "lucide-react";
import type { Book } from "../store/bookStore";
import { Link } from "react-router-dom";
import CoverNotAvailable from "../assets/CoverNotAvailable.jpg";
import toast from "react-hot-toast";
import { useWishlistStore } from "../store/wishlistStore";
import { useAuthStore } from "../store/authStore";

interface BookCardProps {
  book: Book;
}

export default function NewBookCard({ book }: BookCardProps) {
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
    <article className="relative flex items-center gap-5 justify-between bg-border border border-primary-dark p-4.5 lg:p-6 rounded-xs group shadow-lg shadow-black/40 min-h-[200px] max-h-[200px]">
      <Link to={`/books/${book.slug}`}>
        {/*============= Book's Cover =============*/}
        <figure className="shadow-lg shadow-primary-dark mb-3">
          <img
            src={book.imageUrl || CoverNotAvailable}
            alt={`${book.name}'s Cover`}
            loading="lazy"
            className="max-h-[160px] object-cover object-center rounded-xs transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
          />
        </figure>
      </Link>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg lg:text-2xl font-semibold text-center line-clamp-1">
          {book.name}
        </h3>

        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-1.5 mt-2">
          <span className="text-lg lg:text-xl border-r-2 border-primary-dark pr-2">{`€${book.price.toFixed(
            2
          )}`}</span>

          {/*============= Book's Pages Number =============*/}
          <span className="flex items-center gap-1.5 text-lg lg:text-xl border-r-2 border-primary-dark pr-2">
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
        className="absolute top-2 right-2.5 grid place-items-center bg-bg p-1.5 border border-primary-dark rounded-xs cursor-pointer"
        aria-label="Add to Wishlist"
        onClick={() => addBookToWishlist(book)}
      >
        <Heart
          className={`size-5 md:size-6 transition-all duration-200 hover:fill-primary-dark hover:scale-110 ${
            alreadyInWishlist(book._id) && isAuthenticated
              ? "fill-primary-dark"
              : "fill-primary-light"
          }`}
        />
      </button>
    </article>
  );
}
