import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import scrollImg from '../../assets/images/up-arrow.png'
import Image from './../html/image'
import './styles.css'

const ScrollToTop = ({ height }) => {
  const [showButton, setShowButton] = useState(false)

  const handleScrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    if (document.documentElement.scrollTop > height) setShowButton(true)
    else setShowButton(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <button
      className={showButton ? 'scroll-to-top-btn' : 'hidden'}
      onClick={handleScrollToTop}
    >
      <Image src={scrollImg} alt={'scroll top'} width={32} height={32}></Image>
    </button>
  )
}

ScrollToTop.propTypes = {
  height: PropTypes.number,
}

ScrollToTop.defaultProps = {
  height: 200,
}

export default ScrollToTop
