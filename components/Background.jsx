import React from 'react'
import Image from 'next/image'
const Background = () => {
  return (
    <div className=' fixed h-screen  w-screen flex justify-center items-center  ' > 
      <Image src="/bgFlag.jpg" height={500} width={500} className=' blur-xl -z-20  ' alt=' bg-image'  ></Image>
    </div>
  )
}

export default Background
