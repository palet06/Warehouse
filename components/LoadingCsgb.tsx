import Image from 'next/image'
import React from 'react'


const LoadingCsgb = () => {
  return (
    <div className='flex flex-col items-center justify-center animate-pulse'>

        <Image src="/logo.svg" alt='logo' height={70} width={70} className='animate-spin'/>
        <p>Veriler Getiriliyor</p>
    </div>
  )
}

export default LoadingCsgb