import Container from "../layout/Container";
import { useAuthStore } from "../store/authStore";
import { useBookStore, type CreateBookBodyRequest } from "../store/bookStore";
import { useGenreStore } from "../store/genreStore";
import { useEffect, useState } from "react";
import DashBoxes from "../components/DashBoxes";
import Loader from "../shared/Loader";
import AdminBookCard from "../shared/AdminBookCard";
import AdminUserCard from "../shared/AdminUserCard";
import AdminGenreCard from "../shared/AdminGenreCard";
import { BadgePlus } from "lucide-react";
import CreateBookForm from "../components/CreateBookForm";

export default function Dashboard() {
  const { user, users } = useAuthStore();
  const { books, getAllBooks } = useBookStore();
  const { genres, getGenres } = useGenreStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [isCreateBookModalOpen, setIsCreateBookModalOpen] =
    useState<boolean>(false);

  const [createBookData, setCreateBookData] = useState<CreateBookBodyRequest>({
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

  const loadMoreBooks = () => {
    setIsLoading(true);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllBooks({ page, limit: 15 }).finally(() => {
      setIsLoading(false);
    });
    getGenres();
  }, [getAllBooks, getGenres, page]);

  return (
    <section className="py-24 lg:py-28" aria-label="Dashboard">
      <Container>
        {/*============= Welcome =============*/}
        <h2 className="inline-flex items-center gap-2 text-2xl md:text-3xl lg:text-4xl">
          Hi,
          <span className="font-semibold underline">{user?.name}</span>
        </h2>

        {/*============= Dashboard Boxes (Books, Genres, Users, Admin) =============*/}
        <DashBoxes />

        {/*============= Books =============*/}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-1.5">
          <div className="flex flex-col md:pr-1.5 gap-3 mt-10">
            {/*============= Title & Create Book Button =============*/}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-semibold">Books</h2>
              <button
                className="inline-flex items-center gap-2 bg-primary-dark text-primary-light px-3 py-1.5 rounded-sm transition-colors duration-200 hover:bg-primary-dark/90 cursor-pointer"
                onClick={() => setIsCreateBookModalOpen(true)}
              >
                <span>
                  <BadgePlus
                    className="text-green-400"
                    aria-hidden="true"
                    aria-label="Create New Book"
                  />
                </span>
                Create Book
              </button>
            </div>

            {isLoading && <Loader />}

            {!isLoading && books?.length && (
              <ul className="grid grid-cols-1 space-y-2">
                {books?.map((book) => (
                  <li key={book._id}>
                    <AdminBookCard book={book} />
                  </li>
                ))}
              </ul>
            )}

            {/*============= Load More Books =============*/}
            <button
              className="inline-block px-3 py-2 text-lg w-full text-primary-light bg-primary-dark transition-colors duration-200 hover:bg-primary-dark/90 cursor-pointer rounded-xs mt-3"
              onClick={loadMoreBooks}
            >
              Load More Books
            </button>

            {/*============= Users =============*/}
            <div className="flex flex-col md:pr-1.5 gap-3 mt-8">
              {/*============= Title =============*/}
              <h2 className="text-3xl md:text-4xl font-semibold">Users</h2>
              <ul className="grid grid-cols-1 gap-1.5">
                {users?.map((user) => (
                  <AdminUserCard key={user.email} user={user} />
                ))}
              </ul>
            </div>
          </div>

          {/*============= Genres =============*/}
          <div className="flex flex-col md:pl-3 gap-3 mt-10 md:border-l-2 md:border-primary-dark">
            {/*============= Title =============*/}
            <h2 className="text-3xl md:text-4xl font-semibold">Genres</h2>

            {isLoading && <Loader />}

            {!isLoading && books?.length && (
              <ul className="grid grid-cols-1 space-y-2">
                {genres?.map((genre) => (
                  <li key={genre.slug}>
                    <AdminGenreCard genre={genre} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isCreateBookModalOpen && (
          <div className="fixed grid place-items-center inset-0 bg-white/5 backdrop-blur-lg">
            <CreateBookForm
              createBookData={createBookData}
              setCreateBookData={setCreateBookData}
              setIsCreateBookModalOpen={setIsCreateBookModalOpen}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
