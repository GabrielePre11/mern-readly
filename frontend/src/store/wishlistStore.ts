import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Genre } from "./bookStore";

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

interface Wishlist {
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  alreadyInWishlist: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
}

export const useWishlistStore = create<Wishlist>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (book: Book) => {
        if (!book) return;
        if (get().alreadyInWishlist(book._id)) return;

        set((state) => ({
          wishlist: [...state.wishlist, book],
        }));
      },

      alreadyInWishlist: (id: string) => {
        return get().wishlist.some((book: Book) => book._id === id);
      },

      removeFromWishlist: (id: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter((book: Book) => book._id !== id),
        }));
      },
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
