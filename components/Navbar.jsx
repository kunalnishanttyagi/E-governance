"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { useUser } from '../context/UserContext'
import { toast } from 'sonner'
// import user from '@/models/user'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router=useRouter();
  const {user,setUser}=useUser();

  const handleSignOut = async() => {
    try{
      const res=await fetch("/api/userController?action=signout",{
        method:"GET",
        credentials:"include",
      });
      const data=await res.json();
      if(data.message){
        setUser(null);
        // alert(data.message);
        router.push("/login");
        toast.success("Signed out successfully");
      }
      else {
        toast.error("Error signing out");
      }
    }
    catch(err){
      console.log("Error in handleSignOut:",err);
    }
  }
  // const [signedIn, setSignedIn] = useState(false)
  const [isOpen, setOpen] = useState(false)
  // useEffect(()=>{
  //   const fetchuser=async()=>{
  //       const data=await getCurrentUser();
  //     console.log("data",data);
  //       // const data=await kk.json();
  //       // console.log("data",data);
  //     if(data){
  //       setSignedIn(true);
  //     }
  //     else {
  //       setSignedIn(false);
  //     }
  //     }
  //     fetchuser();    
  // },[])
  return (
    <main className=' z-50 flex justify-center items-center  ' >
      <nav className='fixed top-3  px-5 py-3 bg-black rounded-lg flex items-center justify-between gap-12' >
        <Link href="/" className=' flex justify-between items-center gap-4' >
            <Image src="/flag.png" height={40} alt='logo' width={50} className='' ></Image>
            <h2>FelixN</h2>
        </Link>
        <ul className='  gap-4 hidden [@media(min-width:700px)]:flex flex-row ' >
            <li>
              {
                user ? <Link href="/dashboard"><span>Dashboard</span></Link> : <Link href="/"><span>Home</span></Link>
              }
                {/* <Link href="/" >Home</Link> */}
            </li>
            <div className="relative group">
        <div className="cursor-pointer">
          Issue
        </div>

        {/* Dropdown on hover */}
        <ul className="absolute left-0 mt-0 hidden w-32 rounded-md bg-black text-white shadow-md group-hover:block">
          <li className="px-4 rounded-md py-2 hover:bg-gray-200 hover:text-black">
            <Link href="/dashboard/medicalhelp">Medical Issue</Link>
          </li>
          <li className="px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black">
            <Link href="/dashboard/issue">Social Issue</Link>
          </li>
        </ul>
      </div>
            <Link href="#services" title='services' ><li>Services</li></Link>
        </ul>
        {
          user ? (<ul className=' gap-4 hidden [@media(min-width:700px)]:flex flex-row ' >
            <li onClick={handleSignOut} >SignOut</li>
            {/* <li>Register</li> */}
        </ul>) :
          <ul className=' gap-4 hidden [@media(min-width:700px)]:flex flex-row ' >
            <Link href="/login" title='login' ><span onClick={()=> console.log("clicked")} >Login</span></Link>
            <Link href="/signup"title='signup' ><span>Signup</span></Link>
          </ul>
        }
        
        <ul className=' hidden [@media(max-width:699px)]:flex ml-60 ' >
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </ul>
      </nav>
    </main>
  )
}

export default Navbar
