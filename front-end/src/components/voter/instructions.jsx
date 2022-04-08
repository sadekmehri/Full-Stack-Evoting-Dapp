import React, { useState, useEffect } from 'react'
import InstructionCard from '../../reusable/instruction-card'
import Spinner from '../../reusable/spinner'
import { data } from '../../data/voterInstructions'

const Instructions = () => {
  const [loading, setLoading] = useState(true)
  const [listInstructions, setListInstructions] = useState([])

  useEffect(() => {
    const instructionCards = data.map((item) => {
      return (
        <InstructionCard
          key={item.id}
          id={item.id}
          src={item.src}
          alt={item.alt}
          title={item.title}
          text={item.text}
        />
      )
    })

    setListInstructions(instructionCards)
    setLoading(false)
  }, [])

  return (
    <>
      {loading ? (
        <Spinner hidden={!loading} />
      ) : (
        <>
          <div className='mb-3'>
            <h1 className='h1 d-inline align-middle'>
              <i
                className='fal fa-info-circle'
                style={{ marginRight: '5px' }}
              ></i>
              Some Instructions
            </h1>
          </div>
          <div className='row'>{listInstructions}</div>
        </>
      )}
    </>
  )
}

export default Instructions
