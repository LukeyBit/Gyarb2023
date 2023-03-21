import React from 'react'
import badge from '../assets/edamam_badge.svg'

const Footer = () => {
  return (
    <footer className='flex flex-col md:flex-row justify-center md:gap-0 gap-2 items-center p-2 bg-fill-color w-full border-t-4 border-t-primary' >
        <p className='text-center text-sm text-font text-text-color-primary mr-4 md:order-1 order-2' >© 2023 | Created by Lukas Andersson and Theo Lindqvist</p>
        <a href="https://www.edamam.com" target="_blank" className='md:order-2 order-1 bg-white rounded-xl' rel="noopener noreferrer">
          <img src={badge} className='h-10' alt='Search powered by Edamam' />
        </a>
    </footer>
  )
}

export default Footer