"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { books } from "@/lib/books";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ useParams() 사용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import { Book, Page } from '@/lib/types';
import Alert from '../../../components/Alert';
import ProgressBar from '../../../components/ProgressBar';
import ReturnHome from "@/components/ReturnHome";

const renderContent = (content: string[] | string) => {
  if (Array.isArray(content)) {
    // Render first item (title) without bullet
    const [title, ...items] = content;
    return (
      <div>
        <p className="whitespace-pre-line text-gray-600 font-semibold mb-4">{title}</p>
        <ul className="list-disc pl-5 space-y-2">
          {items.map((line, index) => (
            <li key={index} className="whitespace-pre-line text-gray-600">
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p className="whitespace-pre-line text-gray-600">{content}</p>;
};

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
  const textAreaBottomPadding: number = 16;

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
        router.push(`/books/${bookId}/${isDualPage && pageId + 1 < book.pages.length ? pageId + 2 : pageId + 1}`);
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
    
    // Check boundary conditions
    if (pageId === 1 && targetPage < pageId) {
      showAlert("This is the first page!");
      return;
    }
    
    if (pageId === book.pages.length && targetPage > pageId) {
      showAlert("This is the last page!");
      return;
    }
    
    // Only update preview if the target page is different and within bounds
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

  const mainCurrentPage = currentPage;
  const mainNextPage = nextPage;
  const previewCurrentPage = previewPage ? book.pages.find(p => p.id === previewPage) : null;
  const previewNextPage = previewPage ? book.pages.find(p => p.id === previewPage + 1) : null;

  // Add page transition classes
  const pageTransitionClass = previewPage 
    ? previewPage > pageId 
      ? "transition-transform duration-300 translate-x-0" 
      : "transition-transform duration-300 -translate-x-0"
    : "";

  // Calculate max content height from all pages
  const maxContentHeight = Math.max(
    ...book.pages.map(page => {
      const englishLines = Array.isArray(page.english) ? page.english.length : page.english.split('\n').length;
      const koreanLines = page.korean ? page.korean.split('\n').length : 0;
      return englishLines + koreanLines;
    })
  ) * 24; // Approximate line height

  // Add min-height to content containers based on max content
  const contentStyle = {
    minHeight: '720px',
    height: '720px'
  };

  return (
    <div className={`p-4 relative`}>
      <Alert message={alert} isVisible={isAlertVisible} />
      <div className="mb-4">
        <ReturnHome />
      </div>

      {/* Content area for swipe gestures */}
      <div 
        className="content-area"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDualPage && mainNextPage ? (
          <div className="flex gap-8 mt-4 relative mb-16">
            <div className={`w-1/2 p-4 border rounded bg-gray-100 ml-16 ${pageTransitionClass} relative overflow-y-auto`} style={contentStyle}>
              <div className={`${mainCurrentPage.korean ? '' : 'mb-8'}`}>
                {renderContent(mainCurrentPage.english)}
                {mainCurrentPage.korean && (
                  <>
                    <div className="border-t border-dotted border-gray-400 my-4"></div>
                    <p className="text-gray-600 whitespace-pre-line mb-8">{mainCurrentPage.korean}</p>
                  </>
                )}
              </div>
              <div className="absolute bottom-4 right-4 text-gray-400" style={{ right: '4px' }}>
                {mainCurrentPage.id}
              </div>
            </div>
            <div className={`w-1/2 p-4 border rounded bg-gray-100 mr-16 ${pageTransitionClass} relative overflow-y-auto`} style={contentStyle}>
              <div className={`${mainNextPage.korean ? '' : 'mb-8'}`}>
                {renderContent(mainNextPage.english)}
                {mainNextPage.korean && (
                  <>
                    <div className="border-t border-dotted border-gray-400 my-4"></div>
                    <p className="text-gray-600 whitespace-pre-line mb-8">{mainNextPage.korean}</p>
                  </>
                )}
              </div>
              <div className="absolute bottom-4 right-4 text-gray-400" style={{ right: '4px' }}>
                {mainNextPage.id}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className={`p-4 relative mb-16`}>
              <div className={`w-full p-4 pb-[${textAreaBottomPadding}px] border rounded bg-gray-100 ${pageTransitionClass} relative overflow-y-auto`} style={contentStyle}>
                <div className={`${mainCurrentPage.korean ? '' : 'mb-8'}`}>
                  {renderContent(mainCurrentPage.english)}
                  {mainCurrentPage.korean && (
                    <>
                      <div className="border-t border-dotted border-gray-400 my-4"></div>
                      <p className="text-gray-600 whitespace-pre-line mb-8">{mainCurrentPage.korean}</p>
                    </>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 text-gray-400">
                  {mainCurrentPage.id}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProgressBar 
        progress={(pageId / book.pages.length) * 100}
        onTouchStart={handleBarTouchStart}
        onTouchMove={handleBarTouchMove}
        onTouchEnd={handleBarTouchEnd}
        previewPage={previewCurrentPage}
        nextPage={previewNextPage}
        isDualPage={isDualPage}
        contentStyle={contentStyle}
        pageTransitionClass={pageTransitionClass}
      />
    </div>
  );
}