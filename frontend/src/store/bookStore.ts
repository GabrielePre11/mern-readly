import { create } from "zustand";
import axios from "axios";

export interface Genre {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Book {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  author: string;
  genre: Genre;
  pages: number;
  ISBN: string;
  language?: string;
  publishDate: Date;
}

interface Response {
  success: boolean;
  message?: string;
  books?: Book[];
  book?: Book;
  booksCount: number;
  totalBooks: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface BookFilters {
  page: number;
  limit: number;
  genre: string[];
  sort: "newest" | "oldest" | "price-asc" | "price-desc";
}

export interface CreateBookBodyRequest {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  author: string;
  genre: string;
  pages: number;
  ISBN: string;
  language?: string;
  publishDate: string;
}

type UpdateBookBodyRequest = Partial<CreateBookBodyRequest>;

//========= All the properties are not required =========//
type PartialBookFilters = Partial<BookFilters>;

interface BookStore {
  books: Book[] | null;
  featuredBooks: Book[] | null;
  newBooks: Book[] | null;
  book: Book | null;
  errorState: string | null;
  loadingState: boolean;
  message: string | null;
  totalBooks: number;
  booksCount: number;
  page: number;
  limit: number;
  totalPages: number;

  getFeaturedBooks: (filters?: PartialBookFilters) => Promise<void>;
  getNewBooks: (filters?: PartialBookFilters) => Promise<void>;
  getAllBooks: (filters?: PartialBookFilters) => Promise<void>;
  getBook: (bookSlug: string) => Promise<void>;
  searchBook: (userQuery: string) => Promise<void>;

  createBook: (bookData: CreateBookBodyRequest) => Promise<void>;
  updateBook: (
    id: string,
    updateBookData: UpdateBookBodyRequest
  ) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const useBookStore = create<BookStore>((set) => ({
  books: null,
  featuredBooks: null,
  newBooks: null,
  book: null,
  errorState: null,
  loadingState: false,
  message: null,
  totalBooks: 0,
  page: 1,
  limit: 10,
  booksCount: 0,
  totalPages: 0,

  //========= | GET | Featured Books Section =========//
  getFeaturedBooks: async (filters = {}) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const queryParams = new URLSearchParams();

      //========= Genres =========//
      if (filters.genre && filters.genre.length > 0) {
        filters.genre.forEach((g) => queryParams.append("genre", g));
      }

      //========= Sort =========//
      if (filters.sort) queryParams.append("sort", filters.sort);

      //========= Page =========//
      if (filters.page !== undefined)
        queryParams.append("page", String(filters.page));

      //========= Limit =========//
      if (filters.limit !== undefined)
        queryParams.append("limit", String(filters.limit));

      const response = await axios.get<Response>(
        `${API_URL}/books?${queryParams.toString()}`
      );

      if (response.data.success) {
        set({
          page: response.data.page,
          limit: response.data.limit,
          totalBooks: response.data.totalBooks,
          totalPages: response.data.totalPages,
          featuredBooks: response.data.books,
          errorState: null,
          message: response.data.message,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({
          errorState: error.message || "Error while fetching books.",
          loadingState: false,
          books: null,
        });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | GET | New Books Section =========//
  getNewBooks: async (filters = {}) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const queryParams = new URLSearchParams();

      //========= Genres =========//
      if (filters.genre && filters.genre.length > 0) {
        filters.genre.forEach((g) => queryParams.append("genre", g));
      }

      //========= Sort =========//
      if (filters.sort) queryParams.append("sort", filters.sort);

      //========= Page =========//
      if (filters.page !== undefined)
        queryParams.append("page", String(filters.page));

      //========= Limit =========//
      if (filters.limit !== undefined)
        queryParams.append("limit", String(filters.limit));

      const response = await axios.get<Response>(
        `${API_URL}/books?${queryParams.toString()}`
      );

      if (response.data.success) {
        set({
          page: response.data.page,
          limit: response.data.limit,
          totalBooks: response.data.totalBooks,
          totalPages: response.data.totalPages,
          newBooks: response.data.books,
          errorState: null,
          message: response.data.message,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({
          errorState: error.message || "Error while fetching books.",
          loadingState: false,
          newBooks: null,
        });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | GET | Books Route / Page =========//
  getAllBooks: async (filters = {}) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const queryParams = new URLSearchParams();

      //========= Genres =========//
      if (filters.genre && filters.genre.length > 0) {
        filters.genre.forEach((g) => queryParams.append("genre", g));
      }

      //========= Sort =========//
      if (filters.sort) queryParams.append("sort", filters.sort);

      //========= Page =========//
      if (filters.page !== undefined)
        queryParams.append("page", String(filters.page));

      //========= Limit =========//
      if (filters.limit !== undefined)
        queryParams.append("limit", String(filters.limit));

      const response = await axios.get<Response>(
        `${API_URL}/books?${queryParams.toString()}`
      );

      if (response.data.success) {
        set((state) => {
          const existingBooks = new Set(state.books?.map((book) => book._id));

          const newBooks = response.data.books?.filter(
            (book) => !existingBooks.has(book._id)
          );

          return {
            ...state,
            books: [...(state.books || []), ...(newBooks || [])],
            page: filters.page ?? 1,
            limit: response.data.limit,
            booksCount: response.data.booksCount,
            totalBooks: response.data.totalBooks,
            totalPages: response.data.totalPages,
            errorState: null,
            message: response.data.message,
          };
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({
          errorState: error.message || "Error while fetching books.",
          loadingState: false,
          newBooks: null,
        });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | GET | Book Route / Page =========//
  getBook: async (bookSlug: string) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const response = await axios.get<Response>(
        `${API_URL}/books/${bookSlug}`
      );
      set({ book: response.data.book, message: response.data.message });
    } catch (error) {
      if (error instanceof Error) {
        set({
          errorState: error.message || "Error while fetching book.",
          loadingState: false,
          newBooks: null,
        });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= Search Books =========//
  searchBook: async (userQuery: string) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const response = await axios.get<Response>(
        `${API_URL}/books?search=${encodeURIComponent(userQuery)}`
      );

      set({
        books: response.data.books,
        message: response.data.message,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({
          errorState: error.message || "Error while fetching book.",
          books: null,
        });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | POST | Create New Book =========//
  createBook: async (bookData: CreateBookBodyRequest) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const response = await axios.post(
        `${API_URL}/books/create-book`,
        bookData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        set((state) => ({
          books: [response.data.book, ...(state.books || [])],
          message: response.data.message,
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ errorState: error.message });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | PUT | Update Existing Book =========//
  updateBook: async (id: string, updateBookData: UpdateBookBodyRequest) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const response = await axios.put<Response>(
        `${API_URL}/books/update-book/${id}`,
        updateBookData
      );

      if (response.data.success && response.data.book) {
        set((state) => ({
          books:
            state.books?.map((existingBook) =>
              existingBook._id === id ? response.data.book! : existingBook
            ) || [],
          book: response.data.book,
          message: response.data.message,
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ errorState: error.message });
      }
    } finally {
      set({ loadingState: false });
    }
  },

  //========= | DELETE | Delete Book =========//
  deleteBook: async (id: string) => {
    set({ loadingState: true, errorState: null, message: null });

    try {
      const response = await axios.delete<Response>(
        `${API_URL}/books/delete-book/${id}`
      );

      if (response.data.success) {
        set((state) => ({
          books: state.books?.filter((bookToDelete) => bookToDelete._id !== id),
          message: response.data.message,
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ errorState: error.message });
      }
    } finally {
      set({ loadingState: false });
    }
  },
}));
