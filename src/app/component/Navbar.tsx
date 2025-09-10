"use client"

import React, {useState, useEffect} from 'react';
import { Ipost } from '@/types/postInterface';
import { useRouter } from 'next/navigation';
import api from '@/api/axios';
import Image from 'next/image';



export default function Navbar() {
const [allPosts, setAllPosts] = useState<Ipost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get<Ipost[]>("/posts");
        setAllPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  const suggestions = allPosts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (   

    <nav className="bg-white border-gray-200 dark:bg-gray-900 lg:px-10 px-0 fixed min-w-screen ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 sticky">
      <div  className="flex items-center lg:space-x-3 space-x-1 rtl:space-x-reverse">
          <Image src="/logo.png" className="h-8" alt='Logo'  />
          <span className="self-center lg:text-2xl text-xl lg:font-semibold font-medium whitespace-nowrap dark:text-white">Arcodify</span>
      </div>
      
      <form className="flex flex-col items-center w-1/2 ">   
        <div className='flex w-full'>
           <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center lg:ps-3 ps-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                  </svg>
              </div>
              <input type="text" 
              value={searchTerm}
              onChange={(e) =>{
                 setSearchTerm(e.target.value)
                setShowSuggestions(true)}}
               id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 lg:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:ps-10 ps-7 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search blogs..." required />
          </div>
          <button onClick={handleSearch} type="submit" className="p-2.5 ms-2 text-sm font-semibold text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-x-2 ">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="hidden md:block">Search</span>
          </button>
        </div>
        {showSuggestions && searchTerm && (
        <ul className="absolute mt-12 bg-gray-800 shadow-md rounded-md w-1/2 border max-h-48 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((s) => (
              <li
                key={s.id}
                onClick={() => {  setSearchTerm("");   
                  router.push(`/blog/${s.id}`); 
                }}

                className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
              >
                {s.title}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No results found</li>
          )}
        </ul>
      )}
      </form>

      

      </div>
    </nav>

  )
}
