import React from 'react';
import { Page } from '@/lib/types';

// Modified renderContent to accept previewMode and truncate text to 30 characters
const renderContent = (content: string[] | string, previewMode?: boolean) => {
  const limit = 30;
  if (Array.isArray(content)) {
    const [title, ...items] = content;
    const truncatedTitle = previewMode && title.length > limit ? title.slice(0, limit) + "..." : title;
    const truncatedItems = items.map(line =>
      previewMode && line.length > limit ? line.slice(0, limit) + "..." : line
    );
    return (
      <div>
        <p className="whitespace-pre-line text-gray-600 font-semibold mb-4">{truncatedTitle}</p>
        <ul className="list-disc pl-5 space-y-2">
          {truncatedItems.map((line, index) => (
            <li key={index} className="whitespace-pre-line text-gray-600">
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const text = typeof content === "string" && previewMode && content.length > limit 
    ? content.slice(0, limit) + "..." 
    : content;
  return <p className="whitespace-pre-line text-gray-600">{text}</p>;
};

interface ContentPreviewProps {
  currentPage: Page;
  nextPage?: Page;
  isDualPage: boolean;
  contentStyle: React.CSSProperties;
  pageTransitionClass: string;
  previewMode?: boolean;
  previewBottomPadding: number;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ currentPage, nextPage, isDualPage, contentStyle, pageTransitionClass, previewMode, previewBottomPadding }) => {
  const scaleWrapperStyle = previewMode ? { transform: 'scale(0.5)', transformOrigin: 'top left' } : {};
  // Define page number style for preview mode (visible offset 4px after scaling)
  const pageNumberStyle = previewMode ? { bottom: '8px', right: '8px' } : {};

  return (
    <div className="content-area">
      {isDualPage && nextPage ? (
        <div className="flex gap-8 mt-4 relative mb-16" style={scaleWrapperStyle}>
          <div className={`w-1/2 p-4 border rounded-none bg-gray-100 ml-16 ${pageTransitionClass} relative`} style={contentStyle}>
            <div className={`${currentPage.korean ? '' : 'mb-8'}`}>
              {renderContent(currentPage.english, previewMode)}
              {currentPage.korean && (
                <>
                  <div className="border-t border-dotted border-gray-400 my-4"></div>
                  <p className="text-gray-600 whitespace-pre-line mb-8">
                    {previewMode && currentPage.korean.length > 30 ? currentPage.korean.slice(0, 30) + "..." : currentPage.korean}
                  </p>
                </>
              )}
            </div>
            <div className="absolute text-gray-400" style={pageNumberStyle}>
              {currentPage.id}
            </div>
          </div>
          <div className={`w-1/2 p-4 border rounded-none bg-gray-100 mr-16 ${pageTransitionClass} relative`} style={contentStyle}>
            <div className={`${nextPage.korean ? '' : 'mb-8'}`}>
              {renderContent(nextPage.english, previewMode)}
              {nextPage.korean && (
                <>
                  <div className="border-t border-dotted border-gray-400 my-4"></div>
                  <p className="text-gray-600 whitespace-pre-line mb-8">
                    {previewMode && nextPage.korean.length > 30 ? nextPage.korean.slice(0, 30) + "..." : nextPage.korean}
                  </p>
                </>
              )}
            </div>
            <div className="absolute text-gray-400" style={pageNumberStyle}>
              {nextPage.id}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full" style={scaleWrapperStyle}>
          <div className="p-2 relative mb-16">
            <div className={`w-full  p-4 border rounded-none bg-gray-100 overflow-hidden ${pageTransitionClass} relative`} style={contentStyle}>
              <div className={`${currentPage.korean ? '' : 'mb-8'}`}>
                {renderContent(currentPage.english, previewMode)}
                {currentPage.korean && (
                  <>
                    <div className="border-t border-dotted border-gray-400 my-4"></div>
                    <p className="text-gray-600 whitespace-pre-line mb-8">
                      {previewMode && currentPage.korean.length > 30 ? currentPage.korean.slice(0, 30) + "..." : currentPage.korean}
                    </p>
                  </>
                )}
              </div>
              <div className={`absolute text-gray-400 right-8 bottom-8`} style={pageNumberStyle}>
                {currentPage.id}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
