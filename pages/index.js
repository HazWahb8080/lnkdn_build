import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from "next/router"
import styles from '../styles/Home.module.css'
import Header from './../components/Header';
import Sidebar from './../components/Sidebar';
import Feed from './../components/Feed';
import {getSession,useSession} from "next-auth/react"
import Modal from './../components/Modal';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState } from './../atoms/modalAtom';
import { modalTypeState } from './../atoms/modalAtom';
import { connectToDatabase } from '../utils/mongodb';
import  Widgets  from './../components/Widgets';

export default function Home({posts,articles}) {
  const router = useRouter();
  const {data:session} = useSession();
  const [modalopen,setModalOpen] = useRecoilState(modalState)
  const [modaltype,setmodalType] = useRecoilState(modalTypeState)

  const {status} = useSession({
    required:true,
    onUnauthenticated(){
      router.push("/home")
    },
  });

  return (
    <div className='bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6 '>
      <Header/>
      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <Sidebar/>
          <Feed posts={posts}/>
        </div>
        <Widgets articles = {articles} />
        <AnimatePresence>
          {modalopen && <Modal
          handleClose={()=> setModalOpen(false)} type={modaltype}
          />}
        </AnimatePresence>
        </main>
    </div>
  )
}

    export async function getServerSideProps(context){
      // check the user authenticated on the server

      const session = await getSession(context)
      if(!session) {
        return {
          redirect:{
            permanent:false,
            destination:"/home",
          },
        };
      }

      const {db} = await connectToDatabase();
      const posts = await db.collection("posts").find().sort({timestamp:-1}).toArray();

      const results = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`).then((res)=> res.json());

      return {
        props:{
          session,
          articles: results.articles,
          posts: posts.map((post)=>({
            _id: post._id.toString(),
            input:post.input,
            imageurl:post.imageurl,
            usermail:post.username,
            useremail:post.useremail,
            userimage:post.userimage,
            createdat:post.createdat,
          }))
        },
      };
    }