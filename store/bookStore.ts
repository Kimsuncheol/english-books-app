// FILE: store/bookStore.ts

import { create } from "zustand";

type BookState = {
  bookId: number | null;
  pageId: number;
  totalPages: number;
  showPrev: boolean;
  showNext: boolean;
  setBook: (id: number, pages: number) => void;
  setPage: (id: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const useBookStore = create<BookState>((set, get) => ({
  bookId: null,
  pageId: 1,
  totalPages: 1,
  showPrev: false,
  showNext: false,

  setBook: (id, pages) =>
    set({ bookId: id, pageId: 1, totalPages: pages, showPrev: false, showNext: pages > 1 }),

  setPage: (id) =>
    set((state) => ({
      pageId: id,
      showPrev: id > 1,
      showNext: id < state.totalPages,
    })),

  nextPage: () =>
    set((state) => {
      if (state.pageId < state.totalPages) {
        return {
          pageId: state.pageId + 1,
          showPrev: true,
          showNext: state.pageId + 1 < state.totalPages,
        };
      }
      return state;
    }),

  prevPage: () =>
    set((state) => {
      if (state.pageId > 1) {
        return {
          pageId: state.pageId - 1,
          showPrev: state.pageId - 1 > 1,
          showNext: true,
        };
      }
      return state;
    }),
}));