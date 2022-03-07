import React from 'react'
import Image from "next/image"
import HeaderLink from '../components/HeaderLink';
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
const lnkimg = "https://ucarecdn.com/98c6d20d-03a4-4f43-92e9-c4161ef65673/linkedinlogopng1840.png";
const heroimg = "https://ucarecdn.com/a66a2b68-aa8c-443d-8ed7-87d78a713fc3/willowygirlholdingbookssuitcaseandletterforeffectivetimemanagement.png";
import {signIn,signOut,getProviders} from "next-auth/react"

function Home({providers}) {
  return (
    <div className='relative space-y-10'>
        <header className='flex justify-around items-center py-4'>
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
                onClick={ () => signIn (provider.id, {callbackUrl:"/"})}
                className="text-blue-700 font-semibold rounded-full border border-blue-700
                px-5 py-1.5 transition-all  hover:bg-blue-100">
                Signin
                </button>
                </div>
                <button onClick={signOut}> out</button>
                </div>
                ))}



            </div>
        </header>
        <main className=" flex flex-col xl:flex-row items-center 
        max-w-screen-lg mx-auto">
            <div className="space-y-6 xl:space-y-10">
                <h1 className="text-amber-800/80 md:text-5xl text-3xl max-w-xl !leading-snug pl-4 xl:pl-0">
                    Welcome to your professional Community
                </h1>
                <div className="space-y-4">
                    <div className="intent">
                        <h2 className="text-xl"> Search for greatness</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                    <div className="intent">
                        <h2 className="text-xl">Find a person you know</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                    <div className="intent">
                        <h2 className="text-xl"> Learn new skill</h2>
                        <ArrowForwardIosRoundedIcon className="text-gray-700"/>
                    </div>
                </div>
                </div>
                <div className='relative hidden lg:block xl:absolute lg:w-80 lg:h-80 xl:w-[650px] xl:h-[500px] top-14 right-5'>
                    <Image src={heroimg} objectFit="contain" layout="fill" priority/>

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