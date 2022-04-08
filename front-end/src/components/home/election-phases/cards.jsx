import React from 'react'
import Card from './card'
import { data } from '../../../data/electionData'

const Cards = () => {
  const fetchCards = data.map((item, key) => {
    return <Card key={key} span={item.id} h3={item.h3} p={item.p} />
  })

  return <div className='cards'>{fetchCards}</div>
}

export default Cards
