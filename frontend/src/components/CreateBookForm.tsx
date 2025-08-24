import toast from "react-hot-toast";
import { useBookStore, type CreateBookBodyRequest } from "../store/bookStore";
import { useGenreStore } from "../store/genreStore";

interface CreateBookFormProps {
  createBookData: CreateBookBodyRequest;
  setCreateBookData: React.Dispatch<
    React.SetStateAction<CreateBookBodyRequest>
  >;
  setIsCreateBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBookForm({
  createBookData,
  setCreateBookData,
  setIsCreateBookModalOpen,
}: CreateBookFormProps) {
  const { createBook } = useBookStore();
  const { genres } = useGenreStore();

  const handleCreateBookSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await createBook({
        ...createBookData,
        publishDate: createBookData.publishDate,
      });

      toast.success("Book created successfully!");

      setCreateBookData({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        author: "",
        genre: "",
        pages: 0,
        ISBN: "",
        language: "",
        publishDate: "",
      });
      setIsCreateBookModalOpen(false);
    } catch (error) {
      console.error("There was an error creating the book:", error);
      toast.error("Failed to create the book.");
    }
  };

  return (
    <form
      method="dialog"
      aria-modal="true"
      className="flex flex-col gap-4 sm:w-full max-h-[400px] sm:max-h-[450px] md:max-h-[550px] sm:max-w-[580px] md:max-w-[630px] lg:max-w-[700px] overflow-y-auto p-8 bg-primary-dark text-primary-light rounded-lg border border-primary space-y-4"
      onSubmit={handleCreateBookSubmit}
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
            required
            placeholder="Book's Name"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.name}
            onChange={(e) =>
              setCreateBookData((prev) => ({
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
            required
            placeholder="Book's ISBN"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.ISBN}
            onChange={(e) =>
              setCreateBookData((prev) => ({
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
          <label htmlFor="imageUrl" className="mb-1 text-sm font-semibold">
            Image URL *
          </label>
          <input
            id="imageUrl"
            type="url"
            required
            placeholder="Book's Image URL"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.imageUrl}
            onChange={(e) =>
              setCreateBookData((prev) => ({
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
            required
            placeholder="Book's Author"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.author}
            onChange={(e) =>
              setCreateBookData((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1 text-sm font-semibold">
          Description *
        </label>
        <textarea
          id="description"
          required
          placeholder="Book's Description"
          className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm min-h-[120px] md:min-h-[150px] resize-none"
          maxLength={1000}
          value={createBookData.description}
          onChange={(e) =>
            setCreateBookData((prev) => ({
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
            required
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-2 px-2 rounded-sm"
            value={createBookData.genre}
            onChange={(e) =>
              setCreateBookData((prev) => ({
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
            required
            min={0}
            max={1000}
            placeholder="Book's Price"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.price}
            onChange={(e) =>
              setCreateBookData((prev) => ({
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
            required
            min={1}
            placeholder="Book's Pages"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.pages}
            onChange={(e) =>
              setCreateBookData((prev) => ({
                ...prev,
                pages: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="language" className="mb-1 text-sm font-semibold">
            Language
          </label>
          <input
            id="language"
            type="text"
            placeholder="Book's Language"
            className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
            value={createBookData.language}
            onChange={(e) =>
              setCreateBookData((prev) => ({
                ...prev,
                language: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Publish Date */}
      <div className="flex flex-col">
        <label htmlFor="publishDate" className="mb-1 text-sm font-semibold">
          Publish Date *
        </label>
        <input
          id="publishDate"
          type="date"
          required
          className="w-full bg-primary-light text-primary-dark outline-0 text-lg py-1.5 px-2 rounded-sm"
          value={createBookData.publishDate}
          onChange={(e) =>
            setCreateBookData((prev) => ({
              ...prev,
              publishDate: e.target.value,
            }))
          }
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-sm font-semibold hover:bg-green-700 transition-colors duration-200 cursor-pointer"
        >
          Create Book
        </button>

        <button
          type="button"
          className="w-full bg-red-600 text-white py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsCreateBookModalOpen(false)}
        >
          Discard Changes
        </button>
      </div>
    </form>
  );
}
