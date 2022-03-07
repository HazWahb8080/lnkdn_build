import React, {useState} from 'react'
import {useSession}  from "next-auth/react"
import { useRecoilState } from 'recoil';
import { modalState } from './../atoms/modalAtom';
import { handlePostState } from '../atoms/postAtom';

function Form() {
  const {data:session} = useSession();
    const [input,setInput] = useState("");
    const [imageurl,setImageUrl] = useState("");
    const [modalopen,setModalOpen] = useRecoilState(modalState)
    const [handlePost,setHandlePost] = useRecoilState(handlePostState);


    const  uploadPost = async (e)=>{
        e.preventDefault();
        const response = await fetch("/api/posts",{
          method:"POST",
          body: JSON.stringify({
            input :input,
            imageurl : imageurl,
            username:session.user.name,
            userimage:session.user.image,
            useremail:session.user.email,
            createdat: new Date().toString(),
          }),
          headers:{
            "Content-Type":"application/json"
          },
        });
        const responseData = await response.json();
        console.log(responseData)
        setHandlePost (true)
        setModalOpen(false)
    }

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75 ">
        <textarea
         rows="4"
        placeholder='what do u think bro?'
        className='bg-transparent focus:outline-none dark:placeholder-white/75'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />
            <input
            type = "text"
            placeholder = "Add your Photo Url (optional)"
            className='bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75 '
            value={imageurl}
            onChange={(e)=>setImageUrl(e.target.value)}
            />

        <button className="absolute right-0 bottom-0 rounded-full px-3.5 py-1 text-white font-medium bg-blue-400 hover:bg-blue-500 disabled:bg-white/75 disabled:cursor-not-allowed disabled:text-black/40"
        disabled={!input.trim() && !imageurl.trim()}
        type="submit"
        onClick={uploadPost}
        
        >Post</button>
    </form>
  )
}

export default Form