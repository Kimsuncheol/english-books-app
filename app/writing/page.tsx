'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HorizontalLine from '../components/HorizontalLine';
import ReturnHome from '@/components/ReturnHome';

function WritingNewBook() {
    const [title, setTitle] = useState('');
    const [vocaFile, setVocaFile] = useState<File | null>(null);
    const [contentFile, setContentFile] = useState<File | null>(null);
    const [titleFocusOn, setTitleFocusOn] = useState(false);
    const formStype = 'w-full flex space-x-1';

    // New handleSubmit function to show specific messages.
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (title.trim().length === 0) {
            alert('You need to fill in the title');
        } else if (!vocaFile) {
            alert('You need to upload the vocabulary file');
        } else if (!contentFile) {
            alert('You need to upload the content file');
        } else {
            alert('Form is valid');
        }
    }

    return (
        <div className='w-full p-8 text-left overflow-hidden flex flex-col space-y-4'>
            <div className="mb-4">
                <ReturnHome />
            </div>
            <div className='w-full bg-white p-4 rounded-lg shadow-lg text-black'>
                <form className='w-full space-y-4'>
                    <div className={formStype}>
                        <label htmlFor="bookTitle" className='p-2'>Title</label>
                        <input
                            type="text"
                            id="bookTitle"
                            title="Book Title"
                            placeholder="Enter the book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue="" // safe default
                            suppressHydrationWarning
                            className='p-2 border border-gray-300 rounded-lg w-full'
                            onFocus={() => setTitleFocusOn(true)}
                        />
                    </div>
                    <HorizontalLine />
                    <div className='flex flex-col space-y-1'>
                        <div className={formStype}>
                            <label htmlFor="voca" className='p-2'>Vocabulary</label>
                            <input
                                type="file"
                                name="voca"
                                id="voca"
                                title="Vocabulary File"
                                placeholder="Upload vocabulary file"
                                className='p-2'
                                suppressHydrationWarning
                                onChange={(e) => setVocaFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <p className='text-sm px-2'>You can upload only docx or excel type file</p>
                    </div>
                    <HorizontalLine />
                    <div className='flex flex-col space-y-1'>
                        <div className={formStype}>
                            <label htmlFor="book-content" className='p-2'>Contents</label>
                            <input
                                type="file"
                                name="book-content"
                                id="book-content"
                                title="Content File"
                                placeholder="Upload Content file"
                                className='p-2'
                                suppressHydrationWarning
                                onChange={(e) => setContentFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <p className='text-sm px-2'>You can upload only docx type file</p>
                    </div>
                </form>
            </div>
            <button 
                type="submit" 
                className='py-2 px-4 bg-blue-700 text-lg font-bold rounded-[6px]'
                onClick={handleSubmit}
            >
                Upload your book
            </button>
        </div>
    )
}

export default WritingNewBook