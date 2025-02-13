'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
    const pathname = usePathname();

    if (pathname === "/writing") return null;

    return (
        <div className="fixed flex gap-3 top-0 left-0 w-full p-4 bg-white shadow-md z-[9999] text-black">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border border-gray-900 rounded-[8px]"
            />
            <div className="mt-2" onClick={() => {}}>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    );
}
