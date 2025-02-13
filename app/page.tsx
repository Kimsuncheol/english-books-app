'use client';

import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { books } from "../lib/books";
import InfiniteCarousel from "./components/InfiniteCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import ChipView from "./components/ChipView"; // Import ChipView

export default function Home() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const initialTouchYRef = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  // Dummy auth check; replace with real auth logic.
  const isAuthenticated = false;

  const handleTouchStart = (e: React.TouchEvent) => {
    initialTouchYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const delta = currentY - initialTouchYRef.current;
    if (!showSearchBar && delta > 50) {
      setShowSearchBar(true);
    }
    if (showSearchBar && delta < -50) {
      setShowSearchBar(false);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const currentY = e.changedTouches[0].clientY;
    const delta = currentY - initialTouchYRef.current;
    console.log(`Swipe ${delta > 0 ? 'down' : 'up'} by ${Math.abs(delta)} px`);
  };

  const handleAddBookClick = () => {
    if (isAuthenticated) {
      router.push('/writing');
    } else {
      router.push('/auth/login');  // Changed from '/api/auth/login' to '/auth/login'
    }
  };

  const carouselItems = books.map(book => ({
    src: book.image,
    alt: book.title,
    path: book.path
  }));

  return (
    <div
      className="w-screen h-screen p-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showSearchBar && pathname !== '/writing' && (
        <SearchBar />
      )}
      <div className="w-full h-full space-y-8"
        onClick={(e) => {
          console.log(`ClientY: ${e.clientY}`)
          if (showSearchBar) {
            setShowSearchBar(false);
          }
        }}
      >
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">📚 책 목록</h1>
          <div className="flex justify-center items-center space-x-4">
            {/* Replace Link with onClick for auth check */}
            <div onClick={handleAddBookClick} className="cursor-pointer">
              Add Book
            </div>
            <div onClick={() => setShowSearchBar(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        {/* Add ChipView here */}
        <ChipView chips={["Fiction", "Mystery", "Thriller", "Sci-Fi"]} />
        <div className="flex justify-center mb-8">
          <div className="w-full h-64">
            <InfiniteCarousel items={carouselItems} />
          </div>
        </div>
      </div>
    </div>
  );
}