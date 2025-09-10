"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Ipost } from "@/types/postInterface";
import { Icomments } from "@/types/commentsInterface";
import { Iuser } from "@/types/userInterface";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/app/component/loading";
import EmptyPage from "@/app/component/empyPage";



export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>(); 

  const [post, setPost] = useState<Ipost | null>(null);
  const [comments, setComments] = useState<Icomments[]>([]);
  const [user, setUser] = useState<Iuser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const router = useRouter();

  useEffect(() => {
    if (!slug) return  ;

    const fetchData = async () => {
      try {
        const [postRes, commentsRes, usersRes] = await Promise.all([
          api.get<Ipost>(`/posts/${slug}`),
          api.get<Icomments[]>(`/comments?postId=${slug}`),
          api.get<Iuser[]>(`/users`),
        ]);

        setPost(postRes.data);
        setError("")
        setComments(commentsRes.data);

        const author = usersRes.data.find((u) => u.id === postRes.data.userId);
        setUser(author || null);
      } catch (err:any) {
        console.error("Failed to fetch blog details", err);
         if (err.response?.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to fetch post");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <LoadingComponent/>;

  if (error) return <EmptyPage error={error} />;

  if (!post) return <EmptyPage error="Post not found" />;

  return (
    <div className="h-full w-full flex-col flex lg:px-16 px-5 py-28 items-start ">
      <button onClick={() => router.push(`/`)} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex items-center gap-x-2 text-sm px-3 py-2.5 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 "> <IoArrowBackCircle size={20} />Go back </button>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-80 lg:w-1/2 lg:rounded-none lg:rounded-s-lg"
          src="/blog.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between lg:p-8 p-3 leading-normal lg:w-1/2 w-full">
          <h5 className="mb-2 lg:text-2xl text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p className="mb-5 font-normal text-gray-700 dark:text-gray-500 lg:text-base text-sm">
            {post.body}
          </p>
          {user && (
            <p className="text-md text-gray-500 dark:text-gray-200 font-sans font-bold">
              Author : {user.name}
            </p>
          )}
        </div>
      </div>
      
      <hr className="w-full min-h-0.5 my-8 border-0 bg-gray-300 dark:bg-gray-300" />


      <div className="w-full space-y-6">
        <h1 className="lg:text-xl text-base dark:text-gray-200 text-gray-600">Comments</h1>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="py-4 lg:px-8 px-2 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
          >
            <div className="grid lg:grid-cols-10 grid-cols-8 lg:gap-x-0 gap-x-8 items-center">
              <div className="row-span-3 col-span-1 flex items-center self-start justify-center lg:w-10 w-8 lg:h-10 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                <span className="lg:font-bold font-semibold text-gray-600 dark:text-gray-300">
                  {comment.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="lg:col-span-9 col-span-7  font-sans lg:text-lg text-sm font-semibold text-gray-900 dark:text-white">
                {comment.name}
              </div>
              <div className="lg:col-span-9 col-span-7  font-sans lg:text-sm text-xs text-gray-500 dark:text-gray-300 mb-4">
                {comment.email}
              </div>
              <p className="text-gray-700 lg:col-span-9 col-span-7  dark:text-gray-200 italic lg:text-base text-sm">" {comment.body} "</p>

            </div>

          </div>
        ))}
      </div>

      
    </div>
  );
}
