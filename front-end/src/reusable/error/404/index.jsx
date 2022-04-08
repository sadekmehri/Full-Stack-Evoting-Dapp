import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const NotFound = () => {
  return (
    <section>
      <div className='error-content'>
        <div className='error-text'>
          <h1 className='error'>404 Error</h1>
          <div className='im-sheep'>
            <div className='top'>
              <div className='body'></div>
              <div className='head'>
                <div className='im-eye one'></div>
                <div className='im-eye two'></div>
                <div className='im-ear one'></div>
                <div className='im-ear two'></div>
              </div>
            </div>
            <div className='im-legs'>
              <div className='im-leg'></div>
              <div className='im-leg'></div>
              <div className='im-leg'></div>
              <div className='im-leg'></div>
            </div>
          </div>
          <h4>Oops! This page Could Not Be Found!</h4>
          <p>
            Sorry bit the page you are looking for does not exist, have been
            removed or name changed.
          </p>
          <Link to='/' className='btn-err btn-primary-err btn-round'>
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
