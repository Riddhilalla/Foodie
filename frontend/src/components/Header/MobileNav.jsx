import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function MobileNav({ menuitems,Logo,onClose,onOpen,hideLeft}) {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
    <a href="/">
    <img src={Logo} alt="logo" className='h-12' />
    </a>
    <button onClick={onOpen} className='border border-white rounded'>
    <FaBarsStaggered className='w-7 h-7'/>
    </button>

    <div className={`transition-all w-full h-full fixed bg-background z-50 top-0 ${hideLeft} flex justify-center items-center`}>
        <button onClick={onClose} className='absolute right-8 top-32'>
        <RiCloseFill className='w-7 h-7'/>
        </button>
        <div>
            <ul className='flex flex-col gap-5'>
                {
                     menuitems?.map((menu,index) =>(
                        <li key={index}>
                            <Link to={menu} className='font-semibold capitalize text-black font-body'>{menu}</Link>
                        </li>
                    ))
                }
            </ul>
            <ul className='flex items-center gap-4 mt-10'>
            <li>
                <button className='text-black px-4 py-2 rounded-full font-body font-semibold bg-secondary1'>Log In</button>
            </li>
            <li>
                <button className='text-black px-4 py-2 rounded-full font-body font-semibold bg-secondary1'>Sign Up</button>
            </li>
        </ul>

        </div>
    </div>
   
    
       
</div>
  )
}

export default MobileNav