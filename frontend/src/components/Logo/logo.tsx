import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Logo = ({width,height}:{width:number,height:number}) => {
  return (
    <Link href="/" className="flex items-center">
    <Image
      src="/logo.png"
      alt="Site Logo"
      width={width ? width : 320}
      height={height ? height : 320}
      priority
      className='mb-5'
    />
  </Link>
  )
}

export default Logo

