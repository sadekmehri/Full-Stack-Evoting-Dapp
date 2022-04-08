import React from 'react'
import electionImg from '../../../assets/images/election/elections_02.svg'
import Image from '../../../reusable/html/image'

const HeaderImage = () => {
  return (
    <div className='meet-img'>
      <Image
        src={electionImg}
        alt={'election image'}
        className={'meet-img__teacher'}
      />
    </div>
  )
}

export default HeaderImage
