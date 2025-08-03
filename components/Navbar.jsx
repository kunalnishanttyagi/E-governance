import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <main className=' z-50 flex justify-center' >
      <nav className='fixed top-3  px-5 py-3 bg-black rounded-lg flex items-center w-1/2 justify-between gap-4' >
        <ul className=' flex justify-between items-center gap-4' >
            <Image src="/flag.png" height={40} alt='logo' width={50} className='' ></Image>
            <h2>FelixN</h2>
        </ul>
        <ul className=' flex gap-4' >
            <li>
                <Link href="/" >Home</Link>
            </li>
            <li>About</li>
            <li>Services</li>
        </ul>
        <ul className='flex gap-4' >
            <li>Login</li>
            <li>Register</li>
        </ul>
      </nav>
    </main>
  )
}

export default Navbar
