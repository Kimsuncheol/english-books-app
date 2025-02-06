"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { books } from "@/lib/books";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ useParams() 사용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

export default function BookPage() {
  const router = useRouter();
  const params = useParams(); // ✅ Next.js 14에서 params 가져오기
  const bookId = Number(params?.bookId);
  const pageId = Number(params?.pageId);

  const [isDualPage, setIsDualPage] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [alert, setAlert] = useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isBarTouching, setIsBarTouching] = useState(false);
  const [previewPage, setPreviewPage] = useState<number | null>(null);

  const showAlert = (message: string) => {
    setAlert(message);
    setIsAlertVisible(true);
    
    // Start fade out after 2.5s
    setTimeout(() => {
      setIsAlertVisible(false);
      // Remove alert from DOM after fade completes
      setTimeout(() => setAlert(null), 500);
    }, 2500);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDualPage(window.innerWidth >= 1024 && window.innerHeight >= 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle touch events from the content area
    if (e.currentTarget.classList.contains('content-area')) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only handle touch events from the content area
    if (e.currentTarget.classList.contains('content-area')) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (pageId >= book.pages.length) {
        showAlert("This is the last page!");
      } else {
        router.push(`/books/${bookId}/${isDualPage && nextPage ? pageId + 2 : pageId + 1}`);
      }
    }
    
    if (isRightSwipe) {
      if (pageId <= 1) {
        showAlert("This is the first page!");
      } else {
        router.push(`/books/${bookId}/${isDualPage && pageId > 2 ? pageId - 2 : pageId - 1}`);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleBarTouchStart = (e: React.TouchEvent) => {
    setIsBarTouching(true);
  };

  const handleBarTouchMove = (e: React.TouchEvent) => {
    if (!isBarTouching) return;
    
    const touch = e.touches[0];
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const targetPage = Math.max(1, Math.min(Math.ceil(percentage * book.pages.length), book.pages.length));
    
    // Only update preview if the target page is different
    if (targetPage !== pageId) {
      setPreviewPage(targetPage);
    }
  };

  const handleBarTouchEnd = () => {
    setIsBarTouching(false);
    if (previewPage) {
      router.push(`/books/${bookId}/${previewPage}`);
      setPreviewPage(null);
    }
  };

  const book = books.find((b) => b.id === bookId);
  if (!book) return notFound();

  const currentPage = book.pages.find((p) => p.id === pageId);
  if (!currentPage) return notFound();

  const nextPage = book.pages.find((p) => p.id === pageId + 1);

  const currentPageToShow = previewPage ? book.pages.find(p => p.id === previewPage) : currentPage;
  const nextPageToShow = previewPage ? book.pages.find(p => p.id === previewPage + 1) : nextPage;
  const prevPageToShow = previewPage && previewPage > 1 ? book.pages.find(p => p.id === previewPage - 1) : undefined;

  // Add page transition classes
  const pageTransitionClass = previewPage 
    ? previewPage > pageId 
      ? "transition-transform duration-300 translate-x-0" 
      : "transition-transform duration-300 -translate-x-0"
    : "";

  return (
    <div className="p-8 relative">
      {alert && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg z-50
          transition-opacity duration-500 ease-in-out ${isAlertVisible ? 'opacity-100' : 'opacity-0'}`}>
          {alert}
        </div>
      )}
      <div className="mb-4">
        <Link href="/" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHome} />
          Home
        </Link>
      </div>

      {/* Content area for swipe gestures */}
      <div 
        className="content-area"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDualPage && nextPageToShow ? (
          <div className="flex gap-8 mt-4 relative mb-16">
            {pageId > 1 && (
              <Link href={`/books/${bookId}/${isDualPage && pageId > 2 ? pageId - 2 : pageId - 1}`} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center gap-2">
                <FontAwesomeIcon icon={faChevronLeft} />
              </Link>
            )}
            <div className={`w-1/2 p-4 border rounded bg-gray-100 ml-16 ${pageTransitionClass}`}>
              <h2 className="text-xl font-semibold">Page {currentPageToShow.id}</h2>
              <p className="whitespace-pre-line text-gray-600">{currentPageToShow.english}</p>
              <div className="border-t border-dotted border-gray-400 my-4"></div>
              <p className="mt-4 text-gray-600 whitespace-pre-line">{currentPageToShow.korean}</p>
            </div>
            <div className={`w-1/2 p-4 border rounded bg-gray-100 mr-16 ${pageTransitionClass}`}>
              <h2 className="text-xl font-semibold">Page {nextPageToShow.id}</h2>
              <p className="whitespace-pre-line text-gray-600">{nextPageToShow.english}</p>
              <div className="border-t border-dotted border-gray-400 my-4"></div>
              <p className="mt-4 text-gray-600 whitespace-pre-line">{nextPageToShow.korean}</p>
            </div>
            {pageId < book.pages.length && (
              <Link href={`/books/${bookId}/${isDualPage && nextPage ? pageId + 2 : pageId + 1}`} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center gap-2">
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="mt-4 p-4 relative mb-16">
              {pageId > 1 && (
                <Link href={`/books/${bookId}/${isDualPage && pageId > 2 ? pageId - 2 : pageId - 1}`} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center gap-2">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
              )}
              <div className={`mx-8 bg-gray-100 p-4 border rounded ${pageTransitionClass}`}>
                <h2 className="text-xl font-semibold">Page {currentPageToShow.id}</h2>
                <p className="whitespace-pre-line text-gray-600">{currentPageToShow.english}</p>
                <div className="border-t border-dotted border-gray-400 my-4"></div>
                <p className="mt-4 text-gray-600 whitespace-pre-line">{currentPageToShow.korean}</p>
              </div>
              {pageId < book.pages.length && (
                <Link href={`/books/${bookId}/${isDualPage && nextPage ? pageId + 2 : pageId + 1}`} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center gap-2">
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar area for drag gestures */}
      <div className="fixed bottom-8 left-0 w-full px-16">
        <div className="h-2 bg-gray-200 cursor-pointer rounded-full"
             onTouchStart={handleBarTouchStart}
             onTouchMove={handleBarTouchMove}
             onTouchEnd={handleBarTouchEnd}>
          <div 
            className="relative h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(pageId / book.pages.length) * 100}%` }}
          >
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md hover:scale-110 transition-transform cursor-grab active:cursor-grabbing"
              style={{ marginRight: '-8px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}