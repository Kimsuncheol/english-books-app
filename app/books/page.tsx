'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const novels = [
  { id: 1, title: 'Novel 1', author: 'Author 1' },
  { id: 2, title: 'Novel 2', author: 'Author 2' },
  { id: 3, title: 'Novel 3', author: 'Author 3' },
];

const NovelsPage = () => {
  const router = useRouter(); // Hook for navigation

  const handleChooseBook = (id: number) => {
    router.push(`/novels/${id}`); // Navigate to novel details page
  };

  return (
    <div>
      <h1>Novels</h1>
      <ul>
        {novels.map((novel) => (
          <li key={novel.id}>
            <h2>{novel.title}</h2>
            <p>{novel.author}</p>
            <button onClick={() => handleChooseBook(novel.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovelsPage;