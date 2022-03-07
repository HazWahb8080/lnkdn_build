import  ChatIcon from '@mui/icons-material/Chat';
import  HomeRoundedIcon  from '@mui/icons-material/HomeRounded';
import  SearchRoundedIcon  from '@mui/icons-material/SearchRounded';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import  GroupIcon from '@mui/icons-material/Group';
import  BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import  NotificationsIcon from '@mui/icons-material/Notifications';
import  AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HeaderLink from './HeaderLink';
import { useTheme } from 'next-themes';
import {motion} from "framer-motion"
const darkimg = "https://ucarecdn.com/f43e0827-3378-42d7-ad6e-a1d0daeac308/linkedinlogopng1836.png";
const lightimg = "https://ucarecdn.com/337dcdec-4de8-4e2d-a807-dad705867d25/linkedinlogopng1831.png";
const spring = {
  type:"spring",
  stiffness:700,
  damping:30,
}
function Header() {
  const [mounted,setMounted] = useState(false);
  const {setTheme,resolvedTheme,theme} = useTheme();
  useEffect(()=>{
    setMounted(true)
  },[])
  return (
    <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226]  flex items-center justify-around py-1.5 px-3 focus-within:shadow-sm '>
        {/* left */}
        <div className='flex items-center space-x-2 w-full max-w-xs'>
           {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src={lightimg} width={55} height={55} />
              ) : (
                <Image src={darkimg} width={45} height={45} />
            )}
          </>
        )}
            <div className='flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded-full w-full'>
                <SearchRoundedIcon/>
                <input type="text" placeholder="search" className="hidden md:inline-flex
                 bg-transparent  focus:outline-none  dark:placeholder-white/75 flex-grow placeholder-black/70 text-sm"></input>
                </div>
            </div>
        {/* right */}
        <div className='flex items-center space-x-6'>
             <HeaderLink Icon={HomeRoundedIcon} text="Home" active={true} feed={true}/>
             <HeaderLink Icon={GroupIcon} text="My Network" feed={true}/>
             <HeaderLink Icon={BusinessCenterIcon} text="Jobs" hidden={true} feed={true}/>
             <HeaderLink Icon={ChatIcon} text="Messaging" feed={true}/>
             <HeaderLink Icon={NotificationsIcon} text="Notification" feed={true}/>
             <HeaderLink Icon={AccountCircleRoundedIcon} text="Me" avatar={true} hidden={true} feed={true}/>
             <HeaderLink Icon={AppsOutlinedIcon} text="Work" hidden={true} feed={true}/>

    
                 {/* Darkmode */}
                 {mounted && (
                 <div className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative
                 ${resolvedTheme === "dark"? "justify-end" : "justify-start"}
                 `}
                 onClick = {()=> setTheme( resolvedTheme === "dark" ? "light" : "dark")}
                 >
                   <span className="absolute left-0">🌜</span>
                   <motion.div className="w-5 h-5 bg-white rounded-full z-40" layout transition={spring}
                  />
                   <span className="absolute right-0.5">🌞</span>
                 </div>
                 )}
            </div>

    </header>
  )
}

export default Header