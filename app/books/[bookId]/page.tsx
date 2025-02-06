// FILE: app/books/[bookId]/page.tsx

import { redirect } from "next/navigation";
import { books } from "@/lib/books";

export default function RedirectToFirstPage({ params }: { params: { bookId: string } }) {
  const bookId = Number(params.bookId);
  const book = books.find((b) => b.id === bookId);

  if (!book) return null; // 없는 책이라면 아무것도 반환하지 않음

  redirect(`/books/${bookId}/1`); // 첫 번째 페이지로 이동
}