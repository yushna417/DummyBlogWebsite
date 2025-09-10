"use client"

import React, { useState } from "react";
import { Ipost } from "@/types/postInterface";
import Alert from "./alert";
import api from "@/api/axios";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (newPost: Ipost) => void;
  onRemovePost: (id:number) => void;
};

export default function ModalForm({ isOpen, onClose, onAddPost, onRemovePost }: ModalProps) {
 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false); 
  const [alertInfo, setAlertInfo] = useState<{
  title: string;
  body: string;
} | null>(null);

  
  if (!isOpen) return null;

  const validate = ()=> {
    if (title.trim().length < 3 || title.trim(). length > 80){
     return "Title must be between 3 and 80 characters.";
    }

    if (body.trim().length < 10 || body.trim(). length > 500){ 
       return "Body must be between 10 and 500 characters.";
    }

    return "";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateError = validate()
    if (validateError) {
      setAlertInfo({ title: "Validation Error", body: validateError });
      return;
    }

    setLoading(true);

    const tempPost: Ipost = {
      id: Date.now(),
      title,
      body,
      userId:1,
    }

       
    try {
      onAddPost(tempPost)
      const res = await api.post<Ipost>("/posts", tempPost);
      if (res.status !== 201) throw new Error("Failed to create post");

      const newPost = res.data;
      console.log("Post created:", newPost )
      setTitle("")
      setBody("")
      onClose();
    }
    catch(err: unknown) {
      console.error(err);
      setAlertInfo({  title: "Post Error", body:  "Failed to create post" });
      onRemovePost(tempPost.id);
    }
    finally {
          setLoading (false)
        }
    }

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1017]/90 bg-opacity-50">
      <div className="relative p-4 w-full max-w-3xl">
        {alertInfo && <Alert  title={alertInfo.title} body={alertInfo.body} onClose={()=>setAlertInfo(null)} />}

        <div className="relative rounded-lg shadow-lg bg-[#1c232d] shadow-gray-900 lg:p-7 border-gray-600 p-4">
          
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200 rounded-t">
            <h3 className="text-lg font-semibold text-gray-200 ">
              Post a Blog
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 h-6 w-6 content-center hover:bg-gray-400 rounded-md"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">               
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
            </div>
           
            <textarea value={body} onChange={(e) => setBody(e.target.value)}
              placeholder="Description here ..."
              className="w-full border rounded p-2 text-sm"
            />
            <button
              type="submit"
              disabled = {loading}
              className="mx-auto bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
            >
              {loading ? "publishing..." : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
