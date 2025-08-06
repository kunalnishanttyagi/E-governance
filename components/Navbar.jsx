"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Squash as Hamburger } from 'hamburger-react'
const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <main className=' z-50 flex justify-center items-center  ' >
      <nav className='fixed top-3  px-5 py-3 bg-black rounded-lg flex items-center justify-between gap-12' >
        <ul className=' flex justify-between items-center gap-4' >
            <Image src="/flag.png" height={40} alt='logo' width={50} className='' ></Image>
            <h2>FelixN</h2>
        </ul>
        <ul className='  gap-4 hidden [@media(min-width:700px)]:flex flex-row ' >
            <li>
                <Link href="/" >Home</Link>
            </li>
            <li>About</li>
            <li>Services</li>
        </ul>
        <ul className=' gap-4 hidden [@media(min-width:700px)]:flex flex-row ' >
            <li>Login</li>
            <li>Register</li>
        </ul>
        <ul className=' hidden [@media(max-width:699px)]:flex ml-60 ' >
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </ul>
      </nav>
    </main>
  )
}

export default Navbar
