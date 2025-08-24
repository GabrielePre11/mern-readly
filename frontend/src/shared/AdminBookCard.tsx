import { SquarePen, Trash } from "lucide-react";
import { useGenreStore, type Book } from "../store/genreStore";
import { useBookStore, type CreateBookBodyRequest } from "../store/bookStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface AdminBookCardProps {
  book: Book;
}

type UpdateBookBodyRequest = Partial<CreateBookBodyRequest>;

export default function AdminBookCard({ book }: AdminBookCardProps) {
  const { updateBook, deleteBook } = useBookStore();
  const { genres } = useGenreStore();

  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] =
    useState<boolean>(false);

  const [updateBookData, setUpdateBookData] = useState<UpdateBookBodyRequest>({
    name: book.name,
    price: book.price,
    description: book.description,
    imageUrl: book.imageUrl,
    author: book.author,
    genre: book.genre.name,
    pages: book.pages,
    ISBN: book.ISBN,
    language: book.language ?? "Unknown",
    publishDate: new Date(book.publishDate).toISOString().split("T")[0],
  });

  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateBook(book._id, updateBookData);
      toast.success("Book updated successfully!");
      setIsUpdateBookModalOpen(false);
    } catch (error) {
      console.error("There was an error updating the book:", error);
      toast.error("Failed to update the book.");
    }
  };

  return (
    <article className="inline-flex items-center justify-between gap-2.5 px-3 py-1 bg-primary-light rounded-xs w-full border border-border">
      {/*============= Book's Name =============*/}
      <h3 className="font-default text-lg truncate">{book.name}</h3>

      {/*============= POST / PUT Buttons =============*/}
      <div className="flex items-center gap-2">
        {/*============= Edit Book =============*/}
        <button
          className="grid place-items-center w-max p-1 rounded-sm bg-primary-dark text-primary-light transition-colors duration-200 hover:bg-primary-dark/90 cursor-pointer"
          aria-label="Edit Book"
          onClick={() => setIsUpdateBookModalOpen(true)}
        >
          <SquarePen />
        </button>

        {/*============= Delete Book =============*/}
        <button
          className="grid place-items-center w-max p-1 rounded-sm bg-[#c1121f] text-primary-light transition-colors duration-200 hover:bg-[#c1121f]/90 cursor-pointer"
          aria-label="Delete Book"
          onClick={() => deleteBook(book._id)}
        >
          <Trash />
        </button>
      </div>

      {isUpdateBookModalOpen && (
        <div className="fixed grid place-items-center inset-0 bg-white/5 backdrop-blur-lg">
          <form
            method="dialog"
            aria-modal="true"
            onSubmit={handleUpdateBook}
            className="flex flex-col gap-4 sm:w-full max-h-[400px] sm:max-h-[450px] md:max-h-[550px] sm:max-w-[580px] md:max-w-[630px] lg:max-w-[700px] overflow-y-auto p-8 bg-primary-dark text-primary-light rounded-lg border border-primary space-y-4"
          >
            {/* Name + ISBN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-1 text-sm font-semibold">
                  Book's Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Book's Name"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.name}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="isbn" className="mb-1 text-sm font-semibold">
                  ISBN *
                </label>
                <input
                  id="isbn"
                  type="text"
                  placeholder="Book's ISBN"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.ISBN}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      ISBN: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Image + Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="imageUrl"
                  className="mb-1 text-sm font-semibold"
                >
                  Image URL *
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  placeholder="Book's Image URL"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.imageUrl}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="author" className="mb-1 text-sm font-semibold">
                  Author *
                </label>
                <input
                  id="author"
                  type="text"
                  placeholder="Book's Author"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.author}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="mb-1 text-sm font-semibold"
              >
                Description *
              </label>
              <textarea
                id="description"
                placeholder="Book's Description"
                className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm min-h-[120px] md:min-h-[150px] resize-none"
                maxLength={1000}
                value={updateBookData.description}
                onChange={(e) =>
                  setUpdateBookData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Genre + Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col w-full">
                <label htmlFor="genre" className="mb-1 text-sm font-semibold">
                  Genre *
                </label>
                <select
                  id="genre"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-2 px-2 rounded-sm"
                  value={updateBookData.genre}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      genre: e.target.value,
                    }))
                  }
                >
                  <option value="">Choose a genre...</option>
                  {genres?.map((genre) => (
                    <option
                      key={genre.slug}
                      value={genre.name}
                      className="rounded-sm bg-primary text-primary-light"
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="price" className="mb-1 text-sm font-semibold">
                  Price (€) *
                </label>
                <input
                  id="price"
                  type="number"
                  min={0}
                  max={1000}
                  placeholder="Book's Price"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.price}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            {/* Pages + Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col w-full">
                <label htmlFor="pages" className="mb-1 text-sm font-semibold">
                  Pages *
                </label>
                <input
                  id="pages"
                  type="number"
                  min={1}
                  placeholder="Book's Pages"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.pages}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      pages: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="language"
                  className="mb-1 text-sm font-semibold"
                >
                  Language
                </label>
                <input
                  id="language"
                  type="text"
                  placeholder="Book's Language"
                  className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                  value={updateBookData.language}
                  onChange={(e) =>
                    setUpdateBookData((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Publish Date */}
            <div className="flex flex-col">
              <label
                htmlFor="publishDate"
                className="mb-1 text-sm font-semibold"
              >
                Publish Date *
              </label>
              <input
                id="publishDate"
                type="date"
                className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
                value={updateBookData.publishDate}
                onChange={(e) =>
                  setUpdateBookData((prev) => ({
                    ...prev,
                    publishDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-sm font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer"
              >
                Update Book
              </button>

              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  setUpdateBookData({
                    name: book.name,
                    price: book.price,
                    description: book.description,
                    imageUrl: book.imageUrl,
                    author: book.author,
                    genre: book.genre.name,
                    pages: book.pages,
                    ISBN: book.ISBN,
                    language: book.language ?? "Unknown",
                    publishDate: new Date(book.publishDate)
                      .toISOString()
                      .split("T")[0],
                  });
                  setIsUpdateBookModalOpen(false);
                }}
              >
                Discard Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  );
}
