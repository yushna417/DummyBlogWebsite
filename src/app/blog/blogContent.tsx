"use client"

import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Ipost } from "@/types/postInterface";
import LoadingComponent  from "../component/loading";
import { MdOutlineAddCircle } from "react-icons/md";
import { Iuser } from "@/types/userInterface";
import { Icomments } from "@/types/commentsInterface";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Modalform from "../component/modalform";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function Blog() {
  const [post, setPost] = useState<Ipost[]>([]);
  const [user, setUser] = useState<Iuser[]>([])
  const [comment, setComment] = useState<Icomments[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredPosts, setFilteredPosts] = useState<Ipost[]>([]);
  const postsPerPage = 10;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";



  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
 


  useEffect(()=>{
    const fetchBlog = async() =>{
        setLoading(true)
    try {
      const [postRes, userRes, commentRes] = await Promise.all([
        api.get<Ipost[]>("/posts"),
        api.get<Iuser[]>("/users"),
        api.get<Icomments[]>("/comments")
      ])
        setPost(postRes.data)
        setFilteredPosts(postRes.data);
        setUser(userRes.data)
        setComment(commentRes.data)
    } catch(err){
        console.error("Blog fetching error", err)
        setError("Failed to fetch posts")
    } finally{
        setLoading(false);  
    }
    };
    fetchBlog()
  }, [])

  useEffect(() => {
  if (searchQuery.trim() !== "") {
    const lower = searchQuery.toLowerCase();
    setFilteredPosts(
      post.filter((p) => p.title.toLowerCase().includes(lower))
    );
  } else {
    setFilteredPosts(post);
  }
}, [searchQuery, post]);
  
if (loading) return <LoadingComponent/>
if (error) return <p>{error}</p> 

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex)
const totalPages = Math.ceil(post.length /postsPerPage)

const getUserById = (id: number) => user.find((u) => u.id === id);
const getCommentsByPostId = (postId: number) =>
    comment.filter((c) => c.postId === postId);

 const handleRemovePost = (id: number) => {
    setPost((prev) => prev.filter((p) => p.id !== id));
  };


  return (
    <main className="lg:px-8 px-5 py-28 flex flex-col dark:bg-[#0a0a0a] bg-slate-50">
      <button type="button" className="focus:outline-none ml-auto text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:ring-green-300 lg:font-semibold font-medium font-sans lg:rounded-lg rounded-md text-sm lg:px-5 lg:py-2.5 px-2 py-1.5 mb-2 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center lg:gap-2 gap-1"
      onClick={()=> setIsModalOpen(true)}
      > <MdOutlineAddCircle size={20} /> Create Post</button>
      
       <Modalform isOpen={isModalOpen} 
       onClose={() => setIsModalOpen(false)}
       onAddPost={(newPost: Ipost) => setPost([newPost, ...post])} onRemovePost={handleRemovePost}
        />

      <nav aria-label="Page navigation example" className="flex justify-center mt-5 ">
        <ul className="inline-flex -space-x-px text-sm">
          <li>            
            <button  className={`flex items-center justify-center lg:px-3 px-[7px]  lg:h-8 h-5 ms-0 leading-tight lg:font-medium font-normal lg:text-sm text-xs border border-e-0 border-gray-300 lg:rounded-s-lg rounded-s-sm hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === 1
                  ?" bg-gray-300 border-gray-300  dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed": "text-gray-500 bg-white dark:bg-gray-800 "}`}
            onClick={()=> setCurrentPage((prev) => Math.max(prev-1, 1))}
            disabled= {currentPage === 1}>Previous</button>
          </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((no) => (
                  <li key={no}>
                    <button
                      onClick={() => setCurrentPage(no)}
                      className={`flex items-center justify-center lg:px-3 px-[7px]  lg:h-8 h-5 ms-0 leading-tight lg:text-sm text-xs border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === no ?" bg-gray-300 border-gray-300  dark:bg-gray-700  text-gray-900 dark:text-gray-100  cursor-not-allowed": "text-gray-500 bg-white dark:bg-gray-800 "}`}>
                      {no} 
                    </button>
                  </li>
                ))}


          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
             className={`flex items-center justify-center lg:px-3 px-[7px]  lg:h-8 h-5 ms-0 leading-tight lg:font-medium font-normal lg:text-sm text-xs border border-e-0 border-gray-300 lg:rounded-e-lg rounded-e-sm hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === totalPages
                  ?" bg-gray-300 border-gray-300  dark:bg-gray-800  text-gray-900 dark:text-gray-700 cursor-not-allowed": "text-gray-500 bg-white dark:bg-gray-800 "}`}
            >
              Next
            </button>
          </li>
          
         
        </ul>
      </nav>

      <ul className="grid lg:grid-cols-4 grid-cols-1 gap-4 mx-auto my-10  ">
        {currentPosts.map((post, index) => {  
          const user = getUserById(post.userId);
          const postComments  = getCommentsByPostId(post.id);
          return (      
          <div key={index} className=" p-3 h-44 bg-gray-200 flex flex-col justify-between border border-gray-200 hover:border-gray-400 hover:transform-3d hover:shadow-lg rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700 ">

              <h5 className=" h-8 truncate lg:text-lg text-base font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>

              <p className=" font-normal text-gray-700 lg:text-base text-sm dark:text-gray-400 h-20 mb-3 line-clamp-4 leading-5 ">{post.body}</p>

              <div className=" flex gap-x-3 items-center  ">
                 {user && (
                <p className="text-xs flex dark:text-gray-300 text-gray-600 items-center gap-x-1 w-24 break-words  ">
                  <FaUser size={14} /> <span className="truncate">{(user.name).split(' ').slice(0, -1).join(' ')}</span>
                </p>
              )}
              {postComments && (
                  <p className="text-xs flex dark:text-gray-300 text-gray-600 items-center gap-x-1 leading-tight "><BiSolidCommentDetail size={16}/> {postComments.length} </p> 
              )}
                <button  onClick={() => router.push(`/blog/${post.id}`)}
                 className="inline-flex items-center p-1 text-xs font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto gap-x-2">
                  Read more <FaArrowRightLong />                 
              </button>
              </div>
              
          </div>
          );
        })}
      </ul>
      

      
    </main>
  )
}
