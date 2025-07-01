import React, { useState } from 'react'
import DesktopNav from './DesktopNav';
import logo from '/logo.png';
import MobileNav from './MobileNav';

function Header() {
    const [hideLeft, setHideleft] = useState("-left-[1000px]");
    const menuitems = ["recipes","Communities","EatBot"];

    const onOpen = () =>{
        setHideleft("left-0");
    }
    const onClose = () =>{
        setHideleft("-left-[1000px]");
    }
  return (
    <>
    <div className='max-[900px]:hidden'>
        <DesktopNav menuitems={menuitems} Logo={logo} />
    </div>
    <div className='min-[900px]:hidden'>
        <MobileNav 
        menuitems={menuitems}
        Logo = {logo}
        onClose={onClose}
        onOpen = {onOpen}
        hideLeft={hideLeft}
        />
    </div>
    </>
  )
}

export default Header