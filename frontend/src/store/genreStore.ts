import { create } from "zustand";
import axios from "axios";

interface Genre {
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
  genres?: Genre[];
  books?: Book[];
  genre?: Genre;
}

interface genreStore {
  genres: Genre[] | null;
  errorState: string | null;
  loadingState: boolean;
  message: string | null;
  selectedGenre: Genre | null;
  genreBooks: Book[] | null;

  getGenres: () => Promise<void>;
  getSingleGenre: (slug: string, page: number) => Promise<void>;
}

const API_URL = "http://localhost:3000/api/genres";
axios.defaults.withCredentials = true;

export const useGenreStore = create<genreStore>((set) => ({
  genres: null,
  errorState: null,
  loadingState: false,
  message: null,
  selectedGenre: null,
  genreBooks: null,

  getGenres: async () => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.get<Response>(API_URL);
      set({ genres: response.data.genres, message: response.data.message });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  getSingleGenre: async (slug: string, limit: number) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.get<Response>(`${API_URL}/${slug}`);

      set({
        selectedGenre: response.data.genre,
        genreBooks: response.data.books?.slice(0, limit),
        message: response.data.message,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },
}));
