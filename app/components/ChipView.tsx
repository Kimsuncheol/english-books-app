import React from 'react';

interface ChipViewProps {
  chips: string[];
}

const ChipView: React.FC<ChipViewProps> = ({ chips }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, index) => (
        <div key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-300">
          {chip}
        </div>
      ))}
    </div>
  );
};

export default ChipView;
