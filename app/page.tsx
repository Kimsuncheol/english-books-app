// FILE: app/page.tsx

import Link from "next/link";
import { books } from "../lib/books";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📚 책 목록</h1>
      <ul className="list-disc pl-5">
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            <Link href={`/books/${book.id}/1`} className="text-blue-500">
              {book.title} 읽기 →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}