import React, { useState } from 'react';
import ContentPreview from './ContentPreview';
import { Page } from '@/lib/types';

interface ProgressBarProps {
  progress: number;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  previewPage: Page | null;
  nextPage: Page | null;
  isDualPage: boolean;
  contentStyle: React.CSSProperties;
  pageTransitionClass: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, onTouchStart, onTouchMove, onTouchEnd, previewPage, nextPage, isDualPage, contentStyle, pageTransitionClass }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    onTouchStart(e);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    onTouchEnd();
  };

  // Increase the size of the preview
  const previewStyle = {
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '0'
  };

  return (
    <div className="relative bottom-8 w-full px-16">
      <div className="h-2 bg-gray-200 cursor-pointer rounded-full"
           onTouchStart={handleTouchStart}
           onTouchMove={onTouchMove}
           onTouchEnd={handleTouchEnd}>
        <div 
          className="relative w-full h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        >
          <div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md hover:scale-110 transition-transform cursor-grab active:cursor-grabbing"
            style={{ marginRight: '-8px' }}
          />
        </div>
      </div>
      {isDragging && previewPage && (
        <div
          className="absolute -bottom-32 left-2/3 transform -translate-x-1/2"
        //   style={{ width: '400px' }}
        id='preview-window'
        >
          <ContentPreview 
            currentPage={previewPage}
            nextPage={nextPage}
            isDualPage={isDualPage}
            contentStyle={previewStyle}
            textAreaBottomPadding={12}
            pageTransitionClass={pageTransitionClass}
            previewMode={true} // added preview mode flag
          />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
