import React from 'react'
import { useRouter } from 'next/navigation';
import { IoArrowBackCircle } from "react-icons/io5";
import Image from 'next/image';

interface EmptyPageProps {
  error?: string; 
}

export default function EmptyPage({error}: EmptyPageProps) {
    const router = useRouter();
  return (
    <div className="h-1/2 w-full flex-col flex lg:px-16 px-5 py-28 items-start ">
         <button onClick={() => router.push(`/`)} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex items-center gap-x-2 text-sm px-3 py-2.5 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 "> <IoArrowBackCircle size={20} />Go back </button>
         <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
           <Image
             className="object-cover w-full rounded-t-lg h-80 lg:w-1/2 lg:rounded-none lg:rounded-s-lg"
             src="/blog.jpg"
             alt=""
           />
           <div className="flex justify-center items-center lg:p-8 p-3 leading-normal lg:w-1/2 w-full">
             <h5 className="mb-2 lg:text-4xl text-lg font-extrabold font-sans tracking-tight text-gray-900 dark:text-white">
               {error}
             </h5>
             
           </div>
         </div>
         
        
   
         
       </div>
     );
  
}
