import React from 'react'
import { Link } from 'react-router-dom';

function DesktopNav({menuitems,Logo}) {
  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
        <a href="/">
        <img src={Logo} alt="logo" className='h-12' />
        </a>
        <ul className='flex gap-7'>
            {
                menuitems?.map((menu,index) =>(
                    <li key={index}>
                        <Link to={menu} className='font-semibold capitalize text-black font-body'>{menu}</Link>
                    </li>
                ))
            }
        </ul>
        
            <ul className='flex items-center gap-4'>
                <li>
                    <button className='text-black px-4 py-2 rounded-full font-body font-semibold bg-secondary1'>Log In</button>
                </li>
                <li>
                    <button className='text-black px-4 py-2 rounded-full font-body font-semibold bg-secondary1'>Sign Up</button>
                </li>
            </ul>

    </div>
  )
}

export default DesktopNav