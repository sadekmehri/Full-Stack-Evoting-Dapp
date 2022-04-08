import React from 'react'
import Path from '../../../reusable/html/path'
import Svg from '../../../reusable/html/svg'

const Blob = () => {
  return (
    <div className='blob-container' aria-hidden='true'>
      <Svg
        width={'1108'}
        height={'956'}
        viewBox={'0 0 1108 956'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        className={'blob'}
        alt={'Blob'}
      >
        <Path
          d={
            'M1334.54 554.449C1263.07 768.899 1029.31 968.824 815.621 954.671C603.039 940.201 411.317 710.23 248.55 493.507C86.8901 276.467 -45.8155 72.6748 15.4535 -47.8575C75.2985 -169.179 330.225 -207.557 509.074 -248.066C689.029 -288.892 794.014 -332.166 899.526 -310.939C1005.35 -288.606 1111.71 -201.772 1211.8 -44.8973C1311.09 113.401 1404.91 340.317 1334.54 554.449Z'
          }
          className={'accent1'}
        />
      </Svg>
      <Svg
        width={'871'}
        height={'672'}
        viewBox={'0 0 871 672'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        className={'symbols'}
        alt={'Symbols'}
      />
    </div>
  )
}

export default Blob
