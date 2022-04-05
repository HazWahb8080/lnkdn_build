import React from 'react'
import Image from "next/image"
import HeaderLink from '../components/HeaderLink';
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
const lnkimg = "https://ucarecdn.com/98c6d20d-03a4-4f43-92e9-c4161ef65673/linkedinlogopng1840.png";
const heroimg = "https://ucarecdn.com/28ae40ee-b501-4530-ac66-8c17ad8dc27f/bonbonprojectmanagementwithmanyhands.png";
import {signIn,signOut,getProviders, useSession} from "next-auth/react"

function Home({providers}) {

    const {data:session} = useSession();



  return (
    <div className='relative space-y-10 flex flex-col items-center justify-center'>
        <header className='flex justify-around items-center py-4 w-full mb-12 '>
            <div className='relative w-36 h-10'>
                <Image src={lnkimg} layout="fill" objectFit="contain"/>
            </div>
            <div className='flex items-center sm:divide-x divide-gray-300'>
                <div className='hidden sm:flex space-x-8 pr-4'>
                    <HeaderLink Icon={ExploreIcon} text="Discover"/>
                    <HeaderLink Icon={GroupIcon} text="People"/>
                    <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning"/>
                    <HeaderLink Icon={BusinessCenterIcon} text="Jobs"/>
                </div>

                {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                <div className="pl-4">
                <button 
                onClick={ () => session ? signOut() :  signIn (provider.id, {callbackUrl:"/"})}
                className="text-blue-700 font-semibold rounded-full border border-blue-700
                px-5 py-1.5 transition-all  hover:bg-blue-100">
                { session ? "Signout" : "Signin"}
                </button>
                </div>
                </div>
                ))}



            </div>
        </header>
        
        <main className=" flex w-full items-center justify-center xl:px-48 ">
            <div className="flex items-center justify-center xl:justify-between w-full ">
                <div className="space-y-6 xl:space-y-10 mt-12 w-full flex flex-col xl:items-center  items-start justify-center">
                    <div className="w-full flex xl:items-start  items-center justify-center 2xl:pl-36">
                <h1 className="text-amber-800/80 lg:text-5xl md:text-4xl xl:px-2 px-6 text-3xl !leading-snug ">
                    Welcome to your professional Community
                </h1>
                    </div>
                <div className="space-y-4 flex flex-col xl:items-center items-start justify-center w-full">
                    <div className="intent w-full">
                        <h2 className="text-xl"> Search for greatness</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                    <div className="intent w-full">
                        <h2 className="text-xl">Find a person you know</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                    <div className="intent w-full">
                        <h2 className="text-xl"> Learn new skill</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                </div>
                </div>
                <div className='w-full xl:inline-flex hidden items-center justify-center'>
                    <img src={heroimg} className="w-[500px] h-[500px] object-fit object-center hidden xl:inline " />
                </div>
       </div>
        </main>
            </div>
            
  );
}

export default Home;

export async function getServerSideProps (context) {
    const providers = await getProviders();
    return {
        props:{
            providers,
        },
    };
}