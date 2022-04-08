import React from 'react'
import HeaderIntro from './Intro'
import HeaderImage from './image'
import Blob from './blob'

const Header = () => {
  return (
    <>
      <Blob />
      <header>
        <HeaderIntro />
        <HeaderImage />
      </header>
    </>
  )
}

export default Header
