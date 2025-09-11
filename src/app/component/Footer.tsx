import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-200 rounded-lg shadow-sm m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Blog Website</a>. All Rights Reserved.
          </span>
         <p className='mx-auto text-gray-500 dark:text-gray-400 lg:text-base font-mono text-sm'> Made with NextJs, Tailwind CSS and FlowBite </p>
          </div>
      </footer>

    </div>
  )
}
