import Input from "./Input"
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { handlePostState,useSSRPostsState } from './../atoms/postAtom';
import Post from './Post';
import { PostAddSharp } from "@mui/icons-material";

export default function Feed({posts}){
    const [realTimePosts,setrealTimePosts] = useState([]);
    const [handlePost,setHandlePost] = useRecoilState(handlePostState);
    const [useSSRPosts,setuseSSRPostsState] = useRecoilState(useSSRPostsState);

    useEffect(()=>{
        const fetchPosts = async  ()=> {
            const response = await fetch("/api/posts",{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            });
            const responseData = await response.json();
            setrealTimePosts(responseData);
            setHandlePost(false);
            setuseSSRPostsState(false);
        };
        fetchPosts();
    },[handlePost]);

    return(
        <div className="space-y-6 pb-24 max-w-lg">
            <Input/>
            {!useSSRPosts ?
             realTimePosts.map((post)=><Post key={post._id} post={post}  />)
             : posts.map((post)=><Post key={post._id} post={post} />)}
        </div>
    )

}