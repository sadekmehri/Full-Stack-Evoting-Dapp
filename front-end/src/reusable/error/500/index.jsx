import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const BadRequest = () => {
  return (
    <aside>
      <div id='wrap'>
        <div className='hand hand-left'>
          <span className='hand-part part-top'></span>
          <span className='hand-part part-middle'></span>
          <span className='hand-part part-bottom'></span>
        </div>
        <div className='hand hand-right'>
          <span className='hand-part part-top'></span>
          <span className='hand-part part-middle'></span>
          <span className='hand-part part-bottom'></span>
        </div>
        <div className='line line-1'>
          <div className='ball'>5</div>
        </div>
        <div className='line line-2'>
          <div className='ball'>0</div>
        </div>
        <div className='line line-3'>
          <div className='ball'>0</div>
        </div>
        <div id='server'>
          <div className='eye eye-left'>
            <span></span>
          </div>
          <div className='eye eye-right'>
            <span></span>
          </div>
          <div className='block'>
            <div className='light'></div>
          </div>
          <div className='block'>
            <div className='light'></div>
          </div>
          <div className='block'>
            <div className='light'></div>
          </div>
          <div className='block'>
            <div className='light'></div>
          </div>
          <div className='block'>
            <div className='light'></div>
          </div>
          <div id='bottom-block'>
            <div className='bottom-line'></div>
            <div id='bottom-light'></div>
          </div>
        </div>
      </div>

      <div id='code-error'>
        <h1>Oups something wrong happened</h1>
        <h1>Please try again !</h1>
        <Link
          to='/'
          className='btn-err btn-round bad-req-btn'
          style={{
            backgroundColor: '#9c6644',
            color: 'white',
          }}
        >
          Go to homepage
        </Link>
      </div>
    </aside>
  )
}

export default BadRequest
