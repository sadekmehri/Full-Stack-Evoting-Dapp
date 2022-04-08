import React from 'react'
import PropTypes from 'prop-types'
import Charts from '../charts'

const StatisticCard = ({ data, type, label, title, colors }) => {
  return (
    <div className='col-12 col-lg-6'>
      <div className='card'>
        <div className='card-body'>
          <Charts
            type={type}
            label={label}
            data={data}
            title={title}
            colors={colors}
          />
        </div>
      </div>
    </div>
  )
}

StatisticCard.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
}

export default StatisticCard
