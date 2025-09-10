import React from 'react'

export default function LoadingComponent () {
  return (
    <div className='w-full h-full flex justify-center items-center min-h-screen'> 
        <span className="flex w-3 h-3 me-3 bg-gray-200 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-gray-900 rounded-full dark:bg-gray-700"></span>
        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-purple-500 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-indigo-500 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
        <span className="flex w-3 h-3 me-3 bg-teal-500 rounded-full"></span>

    </div>
  )
}
