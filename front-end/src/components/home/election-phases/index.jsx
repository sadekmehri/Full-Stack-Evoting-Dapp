import React from 'react'
import PhaseHeader from './header'
import Arrow from './arrow'
import Cards from './cards'

const ElectionPhases = () => {
  return (
    <section className='method' id='method'>
      <Arrow />
      <PhaseHeader />
      <Cards />
    </section>
  )
}

export default ElectionPhases
